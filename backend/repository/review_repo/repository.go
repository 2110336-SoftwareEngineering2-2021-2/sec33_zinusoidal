package review_repo

import (
	"github.com/jinzhu/gorm"
)

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) InsertReview(appointmentId string, score int, text string) error {

	query := `INSERT INTO review(appointment_id,score,comment)
    VALUES(?,?,?);`

	return db.database.Exec(query, appointmentId, score, text).Error
}

func (db *GromDB) GetReview(userId string) ([]ReviewItem, error) {

	query := `SELECT C.first_name,
    C.profile_image,
    R.score,
    R.comment

	FROM (review R left join appointment A on R.appointment_id = A.appointment_id)
		left join customer C on A.customer_id = C.id

	WHERE A.provider_id = ? ;`

	var res []ReviewItem

	err := db.database.Raw(query, userId).Scan(&res).Error

	if err != nil {
		return nil, err
	}

	return res, nil

}
