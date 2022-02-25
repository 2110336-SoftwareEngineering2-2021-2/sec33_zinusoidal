package schedule_repo

import (
	"errors"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/schedule"
	"github.com/jinzhu/gorm"
)

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) GetProviderAppointment(userId string) ([]schedule.AppointmentDB, error) {

	var results []schedule.AppointmentDB

	query := `SELECT P.fortune_type,
	A.customer_id,
	P.start_time,
	P.finish_time

	FROM appointment A
	LEFT JOIN appointment_service P ON P.appointment_id = A.appointment_id
	WHERE A.provider_id = ? AND A.status = 2;`

	err := db.database.Raw(query, userId).Scan(&results).Error

	return results, err

}

func (db *GromDB) GetProviderSchedule(userId string) ([]model.WorkSchedule, error) {

	var results []schedule.ScheduleDB
	query := `SELECT P.work_schedule 
    FROM provider P
    WHERE P.id = ?;`

	var schedule []model.WorkSchedule

	err := db.database.Raw(query, userId).Scan(&results).Error
	if len(results) == 0 {
		return schedule, errors.New("Provider schedule not found")
	}

	var parseErr error
	schedule, parseErr = model.ParseStringBackToSchedule(results[0].WorkSchedule)

	if parseErr != nil {
		return schedule, errors.New("Parsing schedule error")
	}

	return schedule, err

}
