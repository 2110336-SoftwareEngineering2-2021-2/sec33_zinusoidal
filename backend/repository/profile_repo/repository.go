package profile_repo

import (
	"errors"
	"fmt"

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

	query := `SELECT *
    FROM fortune_user U 
    RIGHT JOIN provider P ON U.id = P.id
    RIGHT JOIN provider_service S ON P.id = S.provider_id
    WHERE U.id = ?;`

	err := db.database.Raw(query, userID).Scan(&providerProfile).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		err := fmt.Errorf("Provider not found")
		return providerProfile, err
	}

	return providerProfile, err

}

func (db *GromDB) GetCustomerByID(userID string) (profile.CustomerProfile, error) {

	var customerProfile profile.CustomerProfile

	query := `SELECT U.username,
    C.first_name,
    C.last_name,
    C.profile_image
	FROM fortune_user U RIGHT JOIN customer C ON U.id = C.id
	WHERE U.id = ?;`

	err := db.database.Raw(query, userID).Scan(&customerProfile).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		err := fmt.Errorf("Customer not found")
		return customerProfile, err
	}

	return customerProfile, err

}

func (db *GromDB) EditProvider(userID string, editRequest profile.ProviderEditRequest) error {

	return nil
}
