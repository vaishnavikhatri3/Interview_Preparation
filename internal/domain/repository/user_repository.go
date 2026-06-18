package repository

import (
	"github.com/google/uuid"

	"interviewaceai/internal/domain/model"
)

type UserRepository interface {
	Create(user *model.User) error
	FindByEmail(email string) (*model.User, error)
	FindByID(id uuid.UUID) (*model.User, error)
}
