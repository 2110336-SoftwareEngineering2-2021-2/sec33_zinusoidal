package appointment

import "github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo/model"

type AppointmentRequest struct {
	ProviderId  string            `json:"providerId" binding:"required"`
	Date        string            `json:"date" binding:"required"`
	Appointment model.Appointment `json:"appointment"`
}
