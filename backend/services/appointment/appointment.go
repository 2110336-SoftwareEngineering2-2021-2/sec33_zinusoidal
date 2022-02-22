package appointment

type Service struct {
	database Databaser
}

type Databaser interface {
	ResponseAppointment(provider_id, appointment_id string, accept bool) error
}

func NewService(database Databaser) *Service {
	return &Service{
		database: database,
	}
}

func (s *Service) MakeAppointment(customerId string, req AppointmentRequest) error {
	return nil
}

func (s *Service) ResponseAppointment(providerId, appointmentId string, accept bool) error {
	return s.database.ResponseAppointment(providerId, appointmentId, accept)
}
