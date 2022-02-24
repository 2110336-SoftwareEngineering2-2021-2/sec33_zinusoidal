package appointment_repo

import (
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo/model"
	"github.com/jinzhu/gorm"
	uuid "github.com/nu7hatch/gouuid"
)

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) ResponseAppointment(provider_id, appointment_id string, accept bool) error {
	response_query := `UPDATE appointment A
    SET A.status = ?
    WHERE A.appointment_id = ? AND A.provider_id = ?`
	var status int
	if accept {
		status = 2
	} else {
		status = 1
	}
	return db.database.Exec(response_query, status, appointment_id, provider_id).Error
}

func (db *GromDB) MakeAppointment(appointment model.Appointment, customerId, providerId, date string) error {

	insert_appointment := `INSERT INTO appointment(appointment_id,customer_id,provider_id)
    VALUES (?, ?, ?)`

	insert_service := `INSERT INTO appointment_service(appointment_id,fortune_type,price,start_time,finish_time)
    VALUES (?, ?, ?, ?, ?)`

	insert_info := `INSERT INTO appointment_info(appointment_id,info_name,info_value)
    VALUES (?, ?, ?)`

	apt_uuid, err := uuid.NewV4()
	if err != nil {
		return err
	}
	apt_id := apt_uuid.String()

	err = db.database.Exec(insert_appointment, apt_id, customerId, providerId).Error
	if err != nil {
		return err
	}

	for _, apt := range appointment.AppointmentInfo {

		start_time, err := model.ParseToTime(apt.Time[0], date)
		if err != nil {
			return err
		}

		end_time, err := model.ParseToTime(apt.Time[1], date)
		if err != nil {
			return err
		}

		err = db.database.Exec(insert_service, apt_id, apt.FortuneType, apt.Price, start_time, end_time).Error
		if err != nil {
			return err
		}
	}

	for i, info := range appointment.Information {
		val := appointment.Value[i]
		err = db.database.Exec(insert_info, info, val).Error
		if err != nil {
			return err
		}
	}

	return nil
}
