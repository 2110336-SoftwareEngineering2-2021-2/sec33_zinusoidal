package auth_repo

import "github.com/jinzhu/gorm"

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}
