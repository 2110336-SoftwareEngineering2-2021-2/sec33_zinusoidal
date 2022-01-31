package auth

import (
	"errors"
	"log"
	"time"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/mashingan/smapping"
	uuid "github.com/nu7hatch/gouuid"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	database Databaser
}

type Databaser interface {
	RegisterCustomer(customer model.Customer) error
	RegisterProvider(provider model.Provider) error
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
	customer := model.Customer{}
	smapping.FillStruct(&customer, smapping.MapFields(&req))
	var err error

	userId, err := uuid.NewV4()
	if err != nil {
		log.Fatal(err)
		return err
	}
	customer.UserId = "C" + userId.String()
	customer.CreateAt = time.Now().String()

	hash_password, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("hashed failed")
	}
	customer.Password = string(hash_password)

	return s.database.RegisterCustomer(customer)
}

func (s *Service) ProviderRegister(req ProviderRegisterRequest) error {
	provider := model.Provider{}
	smapping.FillStruct(&provider, smapping.MapFields(&req))
	var err error
	userId, err := uuid.NewV4()
	if err != nil {
		log.Fatal(err)
		return err
	}
	provider.UserId = "P" + userId.String()
	provider.CreateAt = time.Now().String()

	hash_password, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("hashed failed")
	}
	provider.Password = string(hash_password)

	return s.database.RegisterProvider(provider)
}

func (s *Service) Login(req LoginRequest) error {
	return nil
}
