package search

import "github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"

type Service struct {
	database Databaser
}

type Databaser interface {
	SearchProvider(SearchRequest) ([]profile.ProviderProfile, error)
}

type Servicer interface {
	SearchProvider(req SearchRequest) ([]profile.ProviderProfile, error)
}

func NewService(database Databaser) *Service {
	return &Service{database: database}
}

func (s *Service) SearchProvider(req SearchRequest) ([]profile.ProviderProfile, error) {
	results, err := s.database.SearchProvider(req)
	return results, err
}
