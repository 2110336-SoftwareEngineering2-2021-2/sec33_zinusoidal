package search

import (
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
)

type Service struct {
	database       Databaser
	profileService profile.Service
}

type Databaser interface {
	SearchProvider(SearchRequest) ([]profile.ProviderProfile, error)
	GetAllService() ([]string, error)
	GetLandingPageInfo() (*model.LandingPageInfo, error)
}

type Servicer interface {
	SearchProvider(req SearchRequest) ([]profile.ProviderProfile, error)
}

func NewService(database Databaser, p profile.Service) *Service {
	return &Service{database: database, profileService: p}
}

func (s *Service) SearchProvider(req SearchRequest) ([]profile.ProviderProfile, error) {
	results, err := s.database.SearchProvider(req)

	var returnResults []profile.ProviderProfile

	for _, provider := range results {

		minPrice, maxPrice := s.profileService.CalMinMaxPrice(provider)

		provider.MaxPrice = maxPrice
		provider.MinPrice = minPrice

		returnResults = append(returnResults, provider)

	}

	return returnResults, err
}
func (s *Service) GetAllResult() ([]string, error) {
	return s.database.GetAllService()
}

func (s *Service) GetLandingPageInfo() (*model.LandingPageInfo, error) {
	info, err := s.database.GetLandingPageInfo()
	return info, err
}
