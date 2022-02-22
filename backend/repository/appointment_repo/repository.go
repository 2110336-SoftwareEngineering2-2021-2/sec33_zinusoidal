package appointment_repo

import "github.com/jinzhu/gorm"

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) ResponseAppointment(provider_id, appointment_id string, accept bool) error {
	return nil
}
