package auth

type Service struct {
	database Databaser
}

type Databaser interface {
}

type Servicer interface {
	CustomerRegister(req CustomerRegisterRequest) error
	ProviderRegister(req ProviderRegisterRequest) error
	Login(req LoginRequest) error
}

func NewService(database Databaser) *Service {
	return &Service{database: database}
}

func (s *Service) CustomerRegister(req CustomerRegisterRequest) error {
	return nil
}

func (s *Service) ProviderRegister(req ProviderRegisterRequest) error {
	return nil
}

func (s *Service) Login(req LoginRequest) error {
	return nil
}
