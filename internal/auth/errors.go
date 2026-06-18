package auth

import "errors"

var (
	ErrEmailAlreadyRegistered = errors.New("email already registered")
	ErrInvalidCredentials     = errors.New("invalid email or password")
	ErrInvalidToken           = errors.New("invalid token")
	ErrUnauthorized           = errors.New("unauthorized")
)
