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

	var provider profile.ProviderProfile
	err := db.database.First(&provider, userID).Error
	return provider, err

}

func (db *GromDB) GetCustomerByID(userID string) (profile.CustomerProfile, error) {

	var customer profile.CustomerProfile
	err := db.database.First(&customer, userID).Error
	return customer, err

}

func (db *GromDB) EditProvider(userID string, editRequest profile.ProviderEditRequest) error {

	return nil
}
