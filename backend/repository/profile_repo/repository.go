package profile_repo

import (
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
	"github.com/jinzhu/gorm"
)

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) GetProviderByID(userID string) (profile.ProviderProfile, error) {

	var providerProfile profile.ProviderProfile
	return providerProfile, nil

}

func (db *GromDB) GetCustomerByID(userID string) (profile.CustomerProfile, error) {

	var customerProfile profile.CustomerProfile
	return customerProfile, nil

}

func (db *GromDB) EditProvider(userID string, editRequest profile.ProviderEditRequest) error {

	return nil
}
