package config

import (
	"errors"
	"os"
	"strconv"
	"time"

	_ "github.com/joho/godotenv/autoload"
)

type Config struct {
	Port          string
	DatabaseDSN   string
	JWTSecret     string
	JWTIssuer     string
	AccessTokenTTL  time.Duration
	RefreshTokenTTL time.Duration
}

func LoadConfig() (*Config, error) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		return nil, errors.New("DB_DSN environment variable is required")
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		return nil, errors.New("JWT_SECRET environment variable is required")
	}

	issuer := os.Getenv("JWT_ISSUER")
	if issuer == "" {
		issuer = "interviewaceai"
	}

	accessMinutes := 15
	if value := os.Getenv("ACCESS_TOKEN_MINUTES"); value != "" {
		if parsed, err := strconv.Atoi(value); err == nil && parsed > 0 {
			accessMinutes = parsed
		}
	}

	refreshDays := 7
	if value := os.Getenv("REFRESH_TOKEN_DAYS"); value != "" {
		if parsed, err := strconv.Atoi(value); err == nil && parsed > 0 {
			refreshDays = parsed
		}
	}

	return &Config{
		Port:            port,
		DatabaseDSN:     dsn,
		JWTSecret:       secret,
		JWTIssuer:       issuer,
		AccessTokenTTL:  time.Duration(accessMinutes) * time.Minute,
		RefreshTokenTTL: time.Duration(refreshDays) * 24 * time.Hour,
	}, nil
}
