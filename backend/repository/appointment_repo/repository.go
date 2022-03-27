package appointment_repo

import (
	"context"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo/model"
	"github.com/jinzhu/gorm"
	uuid "github.com/nu7hatch/gouuid"
)

const appointment_collection_name string = "appointments"

type DB struct {
	database *gorm.DB
	client   *firestore.Client
}

func New(db *gorm.DB, client *firestore.Client) *DB {
	return &DB{database: db, client: client}
}

func (db *DB) ResponseAppointment(provider_id, appointment_id string, status int) error {
	response_query := `UPDATE appointment A
    SET A.status = ?
    WHERE A.appointment_id = ? AND A.provider_id = ?`
	err := db.database.Exec(response_query, status, appointment_id, provider_id).Error
	if err != nil {
		return err
	}
	ctx := context.Background()
	_, err = db.client.Collection(appointment_collection_name).Doc(appointment_id).Update(ctx, []firestore.Update{
		{
			Path:  "status",
			Value: status,
		},
		{
			Path:  "updated_at",
			Value: time.Now(),
		},
	})
	return err
}

func (db *DB) MakeAppointment(appointment model.Appointment, customerId, providerId, date string) error {

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
	apt_id := "A" + apt_uuid.String()

	err = db.database.Exec(insert_appointment, apt_id, customerId, providerId).Error
	if err != nil {
		return err
	}
	noti := model.AppointmentNoti{}
	noti.CustomerId = customerId
	noti.ProviderId = providerId
	noti.Status = 0
	noti.TotalPrice = 0
	noti.Information = appointment.Information
	noti.Value = appointment.Value

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

		apt_time := model.AppointmentTime{
			StartTime: start_time,
			EndTime:   end_time,
		}
		noti.AppointmentTime = append(noti.AppointmentTime, apt_time)
		noti.TotalPrice += apt.Price
		noti.Services = append(noti.Services, model.Service{
			FortuneType: apt.FortuneType,
			Price:       apt.Price,
		})
	}

	for i, info := range appointment.Information {
		val := appointment.Value[i]
		err = db.database.Exec(insert_info, apt_id, info, val).Error
		if err != nil {
			return err
		}
	}

	noti.CreatedAt = time.Now()
	noti.UpdatedAt = time.Now()
	ctx := context.Background()
	_, err = db.client.Collection(appointment_collection_name).Doc(apt_id).Set(ctx, noti)

	return err
}
