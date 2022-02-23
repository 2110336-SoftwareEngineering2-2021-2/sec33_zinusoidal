package schedule_repo

import (
	"fmt"

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

	fmt.Println("db", userId)

	query := `SELECT *
	FROM appointment A
	WHERE A.provider_id = ? AND A.status = 2;`

	err := db.database.Raw(query, userId).Scan(&results).Error

	fmt.Println("Test", results)

	return results, err

}
