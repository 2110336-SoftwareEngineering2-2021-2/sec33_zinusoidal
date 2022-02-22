package profile

import (
	"errors"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/auth"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	database       Databaser
	centralService services.Service
	authService    auth.Service
}

type Databaser interface {
	GetProviderByID(userID string) (ProviderProfile, error)
	GetCustomerByID(userID string) (CustomerProfile, error)
	EditProvider(string, ProviderEditRequest, string) (ProviderProfile, error)
	EditPassword(string, string) error
}

func NewService(database Databaser, s services.Service, a auth.Service) *Service {
	return &Service{
		database:       database,
		centralService: s,
		authService:    a,
	}
}

func (s *Service) getProviderProfile(userId string) (ProviderProfile, error) {
	provider, err := s.database.GetProviderByID(userId)
	if err != nil {
		return provider, err
	}

	provider.MinPrice, provider.MaxPrice = s.CalMinMaxPrice(provider)
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

func (s *Service) PasswordEdit(req PasswordEditRequest, userId string) error {

	pwErr := s.authService.CheckPassword(userId, req.OldPassword, req.NewPassword)

	if pwErr != nil {
		return pwErr
	}

	hash_password, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("hashed failed")
	}
	password := string(hash_password)

	err = s.database.EditPassword(userId, password)
	if err != nil {
		return err
	}
	return nil
}

func (s *Service) CalMinMaxPrice(provider ProviderProfile) (int, int) {

	var minPrice int = 10000
	var maxPrice int
	for _, fortune := range provider.Fortune {

		if fortune.Price < minPrice {

			minPrice = fortune.Price
		}

		if fortune.Price > maxPrice {
			maxPrice = fortune.Price
		}

	}
	return maxPrice, minPrice
}
