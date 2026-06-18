package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"interviewaceai/internal/pkg/jwt"
)

const ContextUserIDKey = "userID"

func NewJWTMiddleware(manager *jwt.Manager) fiber.Handler {
	return func(c *fiber.Ctx) error {
		authorization := strings.TrimSpace(c.Get("Authorization"))
		if authorization == "" {
			return fiber.NewError(fiber.StatusUnauthorized, "missing authorization header")
		}

		parts := strings.Fields(authorization)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			return fiber.NewError(fiber.StatusUnauthorized, "invalid authorization header")
		}

		claims, err := manager.VerifyToken(parts[1])
		if err != nil {
			return fiber.NewError(fiber.StatusUnauthorized, "invalid token")
		}

		if claims.TokenType != "access" {
			return fiber.NewError(fiber.StatusUnauthorized, "invalid token type")
		}

		userID, err := uuid.Parse(claims.UserID)
		if err != nil {
			return fiber.NewError(fiber.StatusUnauthorized, "invalid token subject")
		}

		c.Locals(ContextUserIDKey, userID)
		return c.Next()
	}
}

func GetUserID(c *fiber.Ctx) (uuid.UUID, bool) {
	id, ok := c.Locals(ContextUserIDKey).(uuid.UUID)
	return id, ok
}
