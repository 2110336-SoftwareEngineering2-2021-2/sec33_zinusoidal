package profile_repo

import (
	"errors"
	"fmt"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/search"
	"github.com/jinzhu/gorm"
)

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) GetProviderByID(userID string) (profile.ProviderProfile, error) {

	var providerProfiles []profile.ProviderDB
	var returnProfile profile.ProviderProfile

	query := `SELECT U.username,
    P.first_name,
    P.last_name,
    P.profile_image,
    P.biography,
    P.work_schedule,
    P.rating,
    S.fortune_type,
    S.price,
	U.email

    FROM fortune_user U 
    RIGHT JOIN provider P ON U.id = P.id
    RIGHT JOIN provider_service S ON P.id = S.provider_id
    WHERE U.id = ?;`

	err := db.database.Raw(query, userID).Scan(&providerProfiles).Error

	if len(providerProfiles) < 1 {
		err := fmt.Errorf("Provider not found")
		return returnProfile, err
	}

	returnProfile.Biography = providerProfiles[0].Biography
	returnProfile.Email = providerProfiles[0].Email
	returnProfile.FirstName = providerProfiles[0].FirstName
	returnProfile.LastName = providerProfiles[0].LastName
	returnProfile.ProfilePicUrl = providerProfiles[0].ProfilePicUrl
	returnProfile.Rating = providerProfiles[0].Rating
	returnProfile.Username = providerProfiles[0].Username
	returnProfile.WorkSchedule, err = model.ParseStringBackToSchedule(providerProfiles[0].WorkSchedule)

	var fortune model.Fortune
	for _, profile := range providerProfiles {
		fortune.FortuneType = profile.FortuneType
		fortune.Price = profile.Price
		returnProfile.Fortune = append(returnProfile.Fortune, fortune)
	}

	return returnProfile, err

}

func (db *GromDB) GetCustomerByID(userID string) (profile.CustomerProfile, error) {

	var customerProfile profile.CustomerProfile

	query := `SELECT U.username,
    C.first_name,
    C.last_name,
    C.profile_image,
	U.email
	FROM fortune_user U RIGHT JOIN customer C ON U.id = C.id
	WHERE U.id = ?;`

	err := db.database.Raw(query, userID).Scan(&customerProfile).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		err := fmt.Errorf("Customer not found")
		return customerProfile, err
	}

	return customerProfile, nil

}

func (db *GromDB) EditProvider(userID string, editRequest profile.ProviderEditRequest) (profile.ProviderProfile, error) {

	var providerProfile profile.ProviderProfile

	query := `UPDATE provider P
    SET P.first_name = ?,
        P.last_name = ?,
        P.biography = ?,
        P.work_schedule = ?,
        P.last_update_datetime = NOW()
    WHERE P.id = ?;`

	var err error

	editRequest.Schedule, err = model.ParseSchedule(editRequest.WorkSchedule)

	editErr := db.database.Exec(query, editRequest.FirstName, editRequest.LastName, editRequest.Biography, editRequest.Schedule, userID).Error
	if editErr != nil {
		return providerProfile, editErr
	}

	deleteQuery := `DELETE FROM provider_service S
    WHERE S.provider_id = ?;`

	delErr := db.database.Exec(deleteQuery, userID).Error
	if delErr != nil {
		return providerProfile, delErr
	}

	insert_fortune := `INSERT INTO provider_service(provider_id,fortune_type,price)
    VALUES (?, ?, ?);`

	for _, fortune := range editRequest.Fortune {
		err = db.database.Exec(insert_fortune, userID, fortune.FortuneType, fortune.Price).Error
		if err != nil {
			return providerProfile, err
		}
	}

	var findErr error

	providerProfile, findErr = db.GetProviderByID(userID)

	if findErr != nil {
		return providerProfile, findErr
	}

	return providerProfile, nil
}

func (db *GromDB) SearchProvider(searchRequest search.SearchRequest) ([]profile.ProviderProfile, error) {

	var returnResults []profile.ProviderProfile

	var searchResults []search.SearchDB

	var MinPrice float64 = 0
	var MaxPrice float64 = 100000
	var MinRating float64 = 0.0
	var MaxRating float64 = 5.0

	if searchRequest.MinPrice > 0 && searchRequest.MinPrice > MinPrice {
		MinPrice = searchRequest.MinPrice
	}

	if searchRequest.MaxPrice > 0 && searchRequest.MaxPrice < MaxPrice {
		MaxPrice = searchRequest.MaxPrice
	}

	if searchRequest.MinRating > 0 && searchRequest.MinRating > MinRating {
		MinRating = searchRequest.MinRating
	}

	if searchRequest.MaxRating > 0 && searchRequest.MaxRating < MaxRating {
		MaxRating = searchRequest.MaxRating
	}

	var query string
	var fortuneList string = `(`
	if len(searchRequest.FortuneType) > 0 {
		for _, element := range searchRequest.FortuneType {
			fortuneList = fortuneList + `'` + element + `',`
		}
		fortuneList = fortuneList[:len(fortuneList)-1] + `)`
		query = `SELECT
	P.id
  FROM
	provider P
  WHERE
	P.rating >= ?
	AND P.rating <= ?
	AND EXISTS (
	  SELECT
		*
	  FROM
		provider_service S
	  WHERE
		S.provider_id = P.id
		AND S.fortune_type IN ` + fortuneList + ` AND S.price >= ?
		AND S.price <= ?);`

	} else {
		query = `SELECT
	P.id
  FROM
	provider P
  WHERE
	P.rating >= ?
	AND P.rating <= ?
	AND EXISTS (
	  SELECT
		*
	  FROM
		provider_service S
	  WHERE
		S.provider_id = P.id
		AND S.price >= ?
		AND S.price <= ?);`
	}

	err := db.database.Raw(query, MinRating, MaxRating, MinPrice, MaxPrice).Scan(&searchResults).Error

	var profile profile.ProviderProfile
	var getErr error
	if len(searchResults) > 0 {
		for _, id := range searchResults {
			profile, getErr = db.GetProviderByID(id.Id)
			if getErr != nil {
				return returnResults, fmt.Errorf("Error getting profile")
			}
			returnResults = append(returnResults, profile)
		}
	}

	return returnResults, err
}
