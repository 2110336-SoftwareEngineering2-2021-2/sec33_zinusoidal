package test

import (
	"log"
	"net/http"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/jwt"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo/model"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/appointment"
	"github.com/gin-gonic/gin"
	uuid "github.com/nu7hatch/gouuid"
)

func MakeAppointmentHandler(c *gin.Context) {
	claim, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"log": err.Error(),
		})
		return /// wrong JWT
	}
	customerId := claim.UserID

	if customerId[0] != byte('C') {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "must to customer token",
		})
		return /// USE provider ID to make appointment
	}

	req := appointment.AppointmentRequest{}
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return /// binding request failed
	}

	log.Println(req)

	if err = MakeAppointment(req.Appointment, customerId, req.ProviderId, req.Date); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return /// failed somewhere inside function
	}
	c.JSON(http.StatusOK, gin.H{
		"log": "ok",
	}) /// everything passed
}

func MakeAppointment(appointment model.Appointment, customerId, providerId, date string) error {

	insert_appointment := `INSERT INTO appointment(appointment_id,customer_id,provider_id)
    VALUES (?, ?, ?)`

	insert_service := `INSERT INTO appointment_service(appointment_id,fortune_type,price,start_time,finish_time)
    VALUES (?, ?, ?, ?, ?)`

	insert_info := `INSERT INTO appointment_info(appointment_id,info_name,info_value)
    VALUES (?, ?, ?)`

	apt_uuid, _ := uuid.NewV4()
	apt_id := "A" + apt_uuid.String()

	DB.Exec(insert_appointment, apt_id, customerId, providerId)

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
		} /// first date format is wrong

		end_time, err := model.ParseToTime(apt.Time[1], date)
		if err != nil {
			return err
		} /// first correct, second format is wrong

		DB.Exec(insert_service, apt_id, apt.FortuneType, apt.Price, start_time, end_time)

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
		DB.Exec(insert_info, apt_id, info, val)
	}

	return nil
}
