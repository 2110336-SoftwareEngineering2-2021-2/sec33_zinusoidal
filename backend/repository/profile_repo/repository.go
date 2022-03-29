package profile_repo

import (
	"encoding/json"
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

func (db *GromDB) GetRating(userID string) (float64, error) {

	query := `SELECT AVG(R.score) as score
	FROM review R left join appointment A on R.appointment_id = A.appointment_id
	WHERE A.provider_id = ?;`

	type Result struct {
		AverageScore float64 `gorm:"column:score"`
	}

	var r []Result

	if err := db.database.Raw(query, userID).Scan(&r).Error; err != nil {
		return 0.0, err
	}

	return r[0].AverageScore, nil

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
    S.price

    FROM provider P
    LEFT JOIN fortune_user U ON U.id = P.id
    LEFT JOIN provider_service S ON P.id = S.provider_id
    WHERE U.id = ?;`

	err := db.database.Raw(query, userID).Scan(&providerProfiles).Error

	if len(providerProfiles) < 1 {
		err := fmt.Errorf("Provider not found")
		return returnProfile, err
	}

	aptQuery := `SELECT DISTINCT S.fortune_type
	FROM appointment A left join appointment_service S ON A.appointment_id = S.appointment_id
	WHERE A.provider_id=? and A.status=2;`

	type Result struct {
		FortuneType string `gorm:"column:fortune_type" `
	}
	var results []Result

	err = db.database.Raw(aptQuery, userID).Scan(&results).Error

	if err != nil {
		return returnProfile, err
	}

	bookedService := []string{}

	for _, s := range results {
		bookedService = append(bookedService, s.FortuneType)
	}

	returnProfile.UserId = userID
	returnProfile.BookedService = bookedService
	returnProfile.Biography = providerProfiles[0].Biography
	returnProfile.Email = providerProfiles[0].Email
	returnProfile.FirstName = providerProfiles[0].FirstName
	returnProfile.LastName = providerProfiles[0].LastName
	returnProfile.ProfilePicUrl = providerProfiles[0].ProfilePicUrl
	returnProfile.Rating, err = db.GetRating(userID)
	returnProfile.Username = providerProfiles[0].Username
	returnProfile.WorkSchedule, err = model.ParseStringBackToSchedule(providerProfiles[0].WorkSchedule)
	if providerProfiles[0].FortuneType != "" && providerProfiles[0].Price != 0 {
		var fortune model.Fortune
		for _, profile := range providerProfiles {
			fortune.FortuneType = profile.FortuneType
			fortune.Price = profile.Price
			returnProfile.Fortune = append(returnProfile.Fortune, fortune)
		}
	} else {
		returnProfile.Fortune = make([]model.Fortune, 0)
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

	customerProfile.UserId = userID

	return customerProfile, nil

}

func (db *GromDB) EditProvider(userID string, editRequest profile.ProviderEditRequest, profilePicUrl string) (profile.ProviderProfile, error) {

	var providerProfile profile.ProviderProfile

	var query string

	if profilePicUrl == "" {
		query = `UPDATE provider P
    SET P.first_name = ?,
        P.last_name = ?,
		P.biography = ?,
        P.work_schedule = ?,
        P.last_update_datetime = NOW()
    WHERE P.id = ?;`
	} else {
		query = `UPDATE provider P
		SET P.first_name = ?,
			P.last_name = ?,
			P.biography = ?,
			P.work_schedule = ?,
			P.profile_image = ?,
			P.last_update_datetime = NOW()
		WHERE P.id = ?;`
	}

	var err error
	var ws []model.WorkSchedule
	err = json.Unmarshal([]byte(editRequest.WorkSchedule), &ws)
	if err != nil {
		return profile.ProviderProfile{}, err
	}
	editRequest.Schedule, err = model.ParseSchedule(ws)
	var editErr error
	if profilePicUrl == "" {
		editErr = db.database.Exec(query, editRequest.FirstName, editRequest.LastName, editRequest.Biography, editRequest.Schedule, userID).Error
	} else {
		editErr = db.database.Exec(query, editRequest.FirstName, editRequest.LastName, editRequest.Biography, editRequest.Schedule, profilePicUrl, userID).Error
	}

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

	var fortunes []model.Fortune
	err = json.Unmarshal([]byte(editRequest.Fortune), &fortunes)
	if err != nil {
		return profile.ProviderProfile{}, nil
	}

	for _, fortune := range fortunes {
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

	var Keyword string = "'%" + searchRequest.Keyword + "%'"

	var query string
	var fortuneList string = `(`
	if len(searchRequest.FortuneType) > 0 {
		for _, element := range searchRequest.FortuneType {
			fortuneList = fortuneList + `'` + element + `',`
		}
		fortuneList = fortuneList[:len(fortuneList)-1] + `)`
		query = `SELECT P.id FROM provider P LEFT JOIN fortune_user U ON P.id = U.id WHERE P.rating >= ? AND P.rating <= ? AND (  
				P.first_name LIKE ` + Keyword + ` OR
				P.last_name LIKE ` + Keyword + ` OR
				P.biography LIKE ` + Keyword + ` OR
				U.username LIKE ` + Keyword + `
			) AND EXISTS (
				SELECT * FROM provider_service S WHERE S.provider_id = P.id AND S.fortune_type IN ` + fortuneList + ` AND S.price >= ? AND S.price <= ? 
);`

	} else {
		query = `SELECT P.id FROM provider P LEFT JOIN fortune_user U ON P.id = U.id WHERE P.rating >= ? AND P.rating <= ? AND
			(  
				P.first_name LIKE ` + Keyword + ` OR
				P.last_name LIKE ` + Keyword + ` OR
				P.biography LIKE ` + Keyword + ` OR
				U.username LIKE ` + Keyword + `
			) AND
			EXISTS (
				SELECT *
				FROM provider_service S
				WHERE S.provider_id = P.id AND
					S.price >= ? AND
					S.price <= ? 
		);`
	}

	err := db.database.Raw(query, MinRating, MaxRating, MinPrice, MaxPrice).Scan(&searchResults).Error
	var profile profile.ProviderProfile

	if len(searchResults) > 0 {
		for _, id := range searchResults {
			profile, _ = db.GetProviderByID(id.Id)
			returnResults = append(returnResults, profile)
		}
	}
	return returnResults, err
}

func (db *GromDB) GetAllService() ([]string, error) {
	query := `SELECT DISTINCT fortune_type from provider_service;`
	type Result struct {
		FortuneType string `gorm:"column:fortune_type" `
	}
	var results []Result

	err := db.database.Raw(query).Scan(&results).Error
	fortune_results := make([]string, 0)
	if err != nil {
		return fortune_results, err
	}
	for _, fortune := range results {
		fortune_results = append(fortune_results, fortune.FortuneType)
	}
	return fortune_results, nil
}

func (db *GromDB) GetLandingPageInfo() (*model.LandingPageInfo, error) {
	customer_count_query := `SELECT COUNT(*) AS total_customer FROM customer;`
	provider_count_query := `SELECT COUNT(*) AS total_provider FROM provider;`
	fortune_count_query := `SELECT COUNT(DISTINCT(fortune_type)) AS total_fortune_service FROM provider_service;`

	info := model.LandingPageInfo{}

	err := db.database.Raw(customer_count_query).Scan(&info).Error
	if err != nil {
		return nil, err
	}
	err = db.database.Raw(provider_count_query).Scan(&info).Error
	if err != nil {
		return nil, err
	}
	err = db.database.Raw(fortune_count_query).Scan(&info).Error
	if err != nil {
		return nil, err
	}
	return &info, nil
}

func (db *GromDB) EditPassword(userID, NewPassword string) error {

	query := `UPDATE fortune_user U
    SET U.password = ?
    WHERE U.id = ?;`

	err := db.database.Exec(query, NewPassword, userID).Error
	return err
}
