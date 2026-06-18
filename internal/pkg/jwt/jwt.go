package jwt

import (
	"errors"
	"time"

	jwtlib "github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	jwtlib.RegisteredClaims
	UserID    string `json:"user_id"`
	TokenType string `json:"token_type"`
}

type Manager struct {
	secret     string
	issuer     string
	accessTTL  time.Duration
	refreshTTL time.Duration
}

func NewManager(secret, issuer string, accessTTL, refreshTTL time.Duration) *Manager {
	return &Manager{
		secret:     secret,
		issuer:     issuer,
		accessTTL:  accessTTL,
		refreshTTL: refreshTTL,
	}
}

func (m *Manager) GenerateAccessToken(userID string) (string, error) {
	return m.generateToken(userID, "access", m.accessTTL)
}

func (m *Manager) GenerateRefreshToken(userID string) (string, error) {
	return m.generateToken(userID, "refresh", m.refreshTTL)
}

func (m *Manager) generateToken(userID, tokenType string, ttl time.Duration) (string, error) {
	if ttl <= 0 {
		return "", errors.New("token lifetime must be greater than zero")
	}

	claims := Claims{
		RegisteredClaims: jwtlib.RegisteredClaims{
			Issuer:    m.issuer,
			Subject:   userID,
			ExpiresAt: jwtlib.NewNumericDate(time.Now().Add(ttl)),
			IssuedAt:  jwtlib.NewNumericDate(time.Now()),
		},
		UserID:    userID,
		TokenType: tokenType,
	}

	token := jwtlib.NewWithClaims(jwtlib.SigningMethodHS256, claims)
	return token.SignedString([]byte(m.secret))
}

func (m *Manager) VerifyToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	parsed, err := jwtlib.ParseWithClaims(tokenString, claims, func(token *jwtlib.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwtlib.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(m.secret), nil
	}, jwtlib.WithValidMethods([]string{jwtlib.SigningMethodHS256.Name}))
	if err != nil {
		return nil, err
	}

	if !parsed.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
