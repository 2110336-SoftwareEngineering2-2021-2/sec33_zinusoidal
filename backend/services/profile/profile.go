package profile

type Service struct {
	database Databaser
}

type Databaser interface {
	GetProviderByID(string) (ProviderProfile, error)
	GetCustomerByID(string) (CustomerProfile, error)
	EditProvider(string, req ProviderEditRequest) error
}

func NewService(database Databaser) *Service {
	return &Service{database: database}
}

// func (s *Service) ProviderEdit(req ProviderEditRequest, userId string) (model.Provider, error) {
// 	provider, err := s.database.GetProviderByID(userId)

// 	return provider, err
// }

func (s *Service) getProviderProfile(userId string) (ProviderProfile, error) {
	provider, err := s.database.GetProviderByID(userId)
	if err != nil {
		return provider, err
	}
	return provider, nil
}

func (s *Service) getCustomerProfile(userId string) (CustomerProfile, error) {
	customer, err := s.database.GetCustomerByID(userId)
	if err != nil {
		return customer, err
	}
	return customer, nil
}
