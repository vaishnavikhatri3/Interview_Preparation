package postgres

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"interviewaceai/internal/domain/model"
)

func NewPostgresDB(dsn string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(&model.User{}); err != nil {
		return nil, err
	}

	return db, nil
}
