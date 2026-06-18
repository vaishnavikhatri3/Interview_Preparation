package main

import (
	"log"
"fmt"
	"interviewaceai/internal/config"
	"interviewaceai/internal/middleware"
	"interviewaceai/internal/repository/postgres"
	"interviewaceai/internal/router"
	httptransport "interviewaceai/internal/transport/http"
	"interviewaceai/internal/server"
	"interviewaceai/internal/usecase"
	"interviewaceai/internal/pkg/jwt"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("configuration error: %v", err)
	}

	fmt.Println("================================")
	fmt.Println("DSN LOADED:")
	fmt.Println(cfg.DatabaseDSN)
	fmt.Println("================================")

	db, err := postgres.NewPostgresDB(cfg.DatabaseDSN)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}

	userRepo := postgres.NewUserRepository(db)
	jwtManager := jwt.NewManager(cfg.JWTSecret, cfg.JWTIssuer, cfg.AccessTokenTTL, cfg.RefreshTokenTTL)
	authUseCase := usecase.NewAuthUseCase(userRepo, jwtManager)
	authHandler := httptransport.NewAuthHandler(authUseCase)

	app := server.NewApp()

	router.RegisterRoutes(app, authHandler, middleware.NewJWTMiddleware(jwtManager))

	if err := app.Listen(getPort(cfg.Port)); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}

func getPort(port string) string {
	if port == "" {
		return ":8080"
	}
	return ":" + port
}
