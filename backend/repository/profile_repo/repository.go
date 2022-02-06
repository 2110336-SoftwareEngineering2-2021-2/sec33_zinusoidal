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

	query := `SELECT *
    FROM fortune_user U 
    RIGHT JOIN provider P ON U.id = P.id
    RIGHT JOIN provider_service S ON P.id = S.id
    WHERE U.id = ?;`

	err := db.database.Raw(query, userID).Scan(&providerProfile).Error

	return providerProfile, err

}

func (db *GromDB) GetCustomerByID(userID string) (profile.CustomerProfile, error) {

	var customerProfile profile.CustomerProfile

	query := `SELECT U.username,
    C.first_name,
    C.last_name,
    C.profile_image,
FROM fortune_user U RIGHT JOIN customer C ON U.id = C.id
WHERE U.id = ?;`

	err := db.database.Raw(query, userID).Scan(&customerProfile).Error

	return customerProfile, err

}

func (db *GromDB) EditProvider(userID string, editRequest profile.ProviderEditRequest) error {

	return nil
}
