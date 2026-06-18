package router

import (
	"github.com/gofiber/fiber/v2"

	httptransport "interviewaceai/internal/transport/http"
)

func RegisterRoutes(app *fiber.App, authHandler *httptransport.AuthHandler, jwtMiddleware fiber.Handler) {
	auth := app.Group("/api/auth")
	auth.Post("/register", authHandler.Register)
	auth.Post("/login", authHandler.Login)
	auth.Post("/refresh", authHandler.Refresh)
	auth.Get("/me", jwtMiddleware, authHandler.Me)
}
