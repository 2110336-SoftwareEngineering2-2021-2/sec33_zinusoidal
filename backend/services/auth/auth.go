package auth

import (
	"errors"
	"log"
	"math/rand"
	"strings"
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
	Login(username, password string) (string, error)
	InsertConfirmationKey(userId, key string) error
	ConfirmEmail(key string) error
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

	err = s.database.RegisterCustomer(customer)
	if err != nil {
		return err
	}
	key := randomStringKey(20)
	err = sendEmailConfirmationLink(req.Email, key)
	if err != nil {
		return err
	}
	err = s.database.InsertConfirmationKey(customer.UserId, key)
	return err
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
	err = s.database.RegisterProvider(provider)
	if err != nil {
		return err
	}

	hash_password, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("hashed failed")
	}
	provider.Password = string(hash_password)
	key := randomStringKey(20)
	err = sendEmailConfirmationLink(req.Email, key)
	if err != nil {
		return err
	}
	err = s.database.InsertConfirmationKey(provider.UserId, key)
	return err
}

func (s *Service) Login(req LoginRequest) (string, error) {
	userId, err := s.database.Login(req.Username, req.Password)
	return userId, err
}

func (s *Service) ConfirmEmail(key string) error {
	err := s.database.ConfirmEmail(key)
	return err
}

func sendEmailConfirmationLink(email, key string) error {
	/*
		sender := viper.GetString("email.senderEmail")
		password := viper.GetString("email.password")
		mail := gomail.NewMessage()
		mail.SetHeader("From", sender)
		mail.SetHeader("Subject", "Email activation")
		mail.SetHeader("To", email)
		mail.SetBody("text/plain", "http://localhost:"+viper.GetString("app.port")+"/activate/"+key)
		d := gomail.NewDialer(viper.GetString("smtp.host"), viper.GetInt("smtp.port"), sender, password)
		d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
		err := d.DialAndSend(mail)
		return err
	*/
	return nil
}

func randomStringKey(numberOfDigits int) string {
	rand.Seed(time.Now().UnixNano())
	chars := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		"0123456789")
	var b strings.Builder
	for i := 0; i < numberOfDigits; i++ {
		b.WriteRune(chars[rand.Intn(len(chars))])
	}
	key := b.String()
	return key
}
