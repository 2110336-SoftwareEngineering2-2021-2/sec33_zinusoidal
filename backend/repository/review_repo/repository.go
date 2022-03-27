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

	query := `INSERT INTO review(appointment_id,review_score,review_comment)
    VALUES(?,?,?);`

	return db.database.Exec(query, appointmentId, score, text).Error
}
