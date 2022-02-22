package appointment_repo

import (
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo/model"
	"github.com/jinzhu/gorm"
)

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) ResponseAppointment(provider_id, appointment_id string, accept bool) error {
	return nil
}

func (db *GromDB) MakeAppointment(appointmentList []model.Appointment, customerId, providerId, date string) error {
	return nil
}
