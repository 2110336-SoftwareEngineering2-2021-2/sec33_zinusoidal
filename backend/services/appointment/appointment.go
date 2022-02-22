package appointment

import "github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo/model"

type Service struct {
	database Databaser
}

type Databaser interface {
	ResponseAppointment(provider_id, appointment_id string, accept bool) error
	MakeAppointment(appointmentList []model.Appointment, customerId, providerId, date string) error
}

func NewService(database Databaser) *Service {
	return &Service{
		database: database,
	}
}

func (s *Service) MakeAppointment(customerId string, req AppointmentRequest) error {
	return s.database.MakeAppointment(req.AppointmentList, customerId, req.ProviderId, req.Date)
}

func (s *Service) ResponseAppointment(providerId, appointmentId string, accept bool) error {
	return s.database.ResponseAppointment(providerId, appointmentId, accept)
}
