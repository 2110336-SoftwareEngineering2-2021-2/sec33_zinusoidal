package profile

import (
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services"
)

type Service struct {
	database       Databaser
	centralService services.Service
}

type Databaser interface {
	GetProviderByID(userID string) (ProviderProfile, error)
	GetCustomerByID(userID string) (CustomerProfile, error)
	EditProvider(string, ProviderEditRequest, string) (ProviderProfile, error)
}

func NewService(database Databaser, s services.Service) *Service {
	return &Service{
		database:       database,
		centralService: s,
	}
}

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
	return customer, err
}

func (s *Service) ProviderEdit(req ProviderEditRequest, userId string) (ProviderProfile, error) {

	var profilePicUrl string
	var err error
	if req.ProfilePic != nil {
		profilePicUrl, err = s.centralService.UploadFile(*req.ProfilePic, userId+"-profile-"+req.ProfilePic.Filename)
		if err != nil {
			return ProviderProfile{}, err
		}
	} else {
		profilePicUrl = ""
	}

	provider, err := s.database.EditProvider(userId, req, profilePicUrl)
	if err != nil {
		return provider, err
	}

	return provider, nil
}
