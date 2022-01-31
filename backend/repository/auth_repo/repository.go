package auth_repo

import (
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/jinzhu/gorm"
)

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) RegisterCustomer(customer model.Customer) error {
	return nil
}

func (db *GromDB) RegisterProvider(provider model.Provider) error {
	return nil
}

func (db *GromDB) IsExistUsernameAndEmail() bool {
	return false
}
