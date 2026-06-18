package usecase

import (
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"

	"interviewaceai/internal/auth"
	"interviewaceai/internal/domain/model"
	domainrepo "interviewaceai/internal/domain/repository"
	"interviewaceai/internal/pkg/hash"
	"interviewaceai/internal/pkg/jwt"
)

type AuthUseCase interface {
	Register(ctx context.Context, email, password string) (accessToken string, refreshToken string, err error)
	Login(ctx context.Context, email, password string) (accessToken string, refreshToken string, err error)
	RefreshToken(ctx context.Context, refreshToken string) (accessToken string, newRefreshToken string, err error)
}

type authUseCase struct {
	userRepo   domainrepo.UserRepository
	jwtManager *jwt.Manager
}

func NewAuthUseCase(userRepo domainrepo.UserRepository, jwtManager *jwt.Manager) AuthUseCase {
	return &authUseCase{userRepo: userRepo, jwtManager: jwtManager}
}

func (u *authUseCase) Register(ctx context.Context, email, password string) (string, string, error) {
	email = strings.TrimSpace(email)
	password = strings.TrimSpace(password)
	if email == "" || password == "" {
		return "", "", errors.New("email and password are required")
	}

	_, err := u.userRepo.FindByEmail(email)
	if err == nil {
		return "", "", auth.ErrEmailAlreadyRegistered
	}
	if !errors.Is(err, domainrepo.ErrNotFound) {
		return "", "", err
	}

	hash, err := hash.GeneratePasswordHash(password)
	if err != nil {
		return "", "", err
	}

	user := &model.User{
		ID:           uuid.New(),
		Email:        email,
		PasswordHash: hash,
	}

	if err := u.userRepo.Create(user); err != nil {
		return "", "", err
	}

	accessToken, err := u.jwtManager.GenerateAccessToken(user.ID.String())
	if err != nil {
		return "", "", err
	}

	refreshToken, err := u.jwtManager.GenerateRefreshToken(user.ID.String())
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func (u *authUseCase) Login(ctx context.Context, email, password string) (string, string, error) {
	email = strings.TrimSpace(email)
	password = strings.TrimSpace(password)
	if email == "" || password == "" {
		return "", "", auth.ErrInvalidCredentials
	}

	user, err := u.userRepo.FindByEmail(email)
	if err != nil {
		if errors.Is(err, domainrepo.ErrNotFound) {
			return "", "", auth.ErrInvalidCredentials
		}
		return "", "", err
	}

	if err := hash.ComparePasswordHash(user.PasswordHash, password); err != nil {
		return "", "", auth.ErrInvalidCredentials
	}

	accessToken, err := u.jwtManager.GenerateAccessToken(user.ID.String())
	if err != nil {
		return "", "", err
	}

	refreshToken, err := u.jwtManager.GenerateRefreshToken(user.ID.String())
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func (u *authUseCase) RefreshToken(ctx context.Context, refreshToken string) (string, string, error) {
	token := strings.TrimSpace(refreshToken)
	if token == "" {
		return "", "", auth.ErrInvalidToken
	}

	claims, err := u.jwtManager.VerifyToken(token)
	if err != nil {
		return "", "", auth.ErrInvalidToken
	}

	if claims.TokenType != "refresh" {
		return "", "", auth.ErrInvalidToken
	}

	userID, err := uuid.Parse(claims.UserID)
	if err != nil {
		return "", "", auth.ErrInvalidToken
	}

	_, err = u.userRepo.FindByID(userID)
	if err != nil {
		if errors.Is(err, domainrepo.ErrNotFound) {
			return "", "", auth.ErrInvalidToken
		}
		return "", "", err
	}

	accessToken, err := u.jwtManager.GenerateAccessToken(userID.String())
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err := u.jwtManager.GenerateRefreshToken(userID.String())
	if err != nil {
		return "", "", err
	}

	return accessToken, newRefreshToken, nil
}
