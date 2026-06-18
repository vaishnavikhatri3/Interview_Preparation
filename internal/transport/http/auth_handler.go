package httptransport

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"interviewaceai/internal/auth"
	"interviewaceai/internal/middleware"
	"interviewaceai/internal/usecase"
)

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RefreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

type AuthResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

type AuthHandler struct {
	authUseCase usecase.AuthUseCase
}

func NewAuthHandler(authUseCase usecase.AuthUseCase) *AuthHandler {
	return &AuthHandler{authUseCase: authUseCase}
}

func (h *AuthHandler) Register(c *fiber.Ctx) error {
	var req RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid request payload")
	}

	access, refresh, err := h.authUseCase.Register(c.Context(), req.Email, req.Password)
	if err != nil {
		return h.mapError(err)
	}

	return c.Status(fiber.StatusCreated).JSON(AuthResponse{AccessToken: access, RefreshToken: refresh})
}

func (h *AuthHandler) Login(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid request payload")
	}

	access, refresh, err := h.authUseCase.Login(c.Context(), req.Email, req.Password)
	if err != nil {
		return h.mapError(err)
	}

	return c.Status(fiber.StatusOK).JSON(AuthResponse{AccessToken: access, RefreshToken: refresh})
}

func (h *AuthHandler) Refresh(c *fiber.Ctx) error {
	var req RefreshRequest
	if err := c.BodyParser(&req); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "invalid request payload")
	}

	access, refresh, err := h.authUseCase.RefreshToken(c.Context(), req.RefreshToken)
	if err != nil {
		return h.mapError(err)
	}

	return c.Status(fiber.StatusOK).JSON(AuthResponse{AccessToken: access, RefreshToken: refresh})
}

func (h *AuthHandler) Me(c *fiber.Ctx) error {
	userID, ok := c.Locals(middleware.ContextUserIDKey).(uuid.UUID)
	if !ok || userID == uuid.Nil {
		return fiber.NewError(fiber.StatusUnauthorized, auth.ErrUnauthorized.Error())
	}

	return c.Status(fiber.StatusOK).JSON(map[string]string{"userId": userID.String()})
}

func (h *AuthHandler) mapError(err error) *fiber.Error {
	if errors.Is(err, auth.ErrEmailAlreadyRegistered) {
		return fiber.NewError(fiber.StatusConflict, err.Error())
	}
	if errors.Is(err, auth.ErrInvalidCredentials) || errors.Is(err, auth.ErrInvalidToken) || errors.Is(err, auth.ErrUnauthorized) {
		return fiber.NewError(fiber.StatusUnauthorized, err.Error())
	}
	return fiber.NewError(fiber.StatusInternalServerError, "server error")
}
