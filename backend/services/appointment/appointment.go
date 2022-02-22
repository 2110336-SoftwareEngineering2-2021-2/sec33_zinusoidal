package appointment

type Service struct {
	database Databaser
}

type Databaser interface {
}

func NewService(database Databaser) *Service {
	return &Service{
		database: database,
	}
}

func (s *Service) MakeAppointment(customerId string, req AppointmentRequest) error {
	return nil
}
