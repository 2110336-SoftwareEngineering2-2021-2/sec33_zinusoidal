package auth

import (
	"crypto/tls"
	"encoding/json"
	"errors"
	"log"
	"math/rand"
	"strings"
	"time"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services"
	"github.com/mashingan/smapping"
	uuid "github.com/nu7hatch/gouuid"
	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
)

type Service struct {
	database       Databaser
	centralService services.Service
}

type Databaser interface {
	RegisterCustomer(customer model.Customer) error
	RegisterProvider(provider model.Provider) error
	Login(username, password string) (model.LoginQuery, error)
	InsertConfirmationKey(userId, key string) error
	ConfirmEmail(key string) error
	CheckPassword(userId, oldPassword, newPassword string) error
}

func NewService(database Databaser, centralService services.Service) *Service {
	return &Service{
		database:       database,
		centralService: centralService,
	}
}

func (s *Service) CustomerRegister(req CustomerRegisterRequest) error {
	customer := model.Customer{}
	smapping.FillStruct(&customer, smapping.MapFields(&req))
	var err error

	userId, err := uuid.NewV4()
	if err != nil {
		return err
	}
	customer.UserId = "C" + userId.String()
	customer.CreateAt = time.Now().String()

	hash_password, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("hashed failed")
	}
	customer.Password = string(hash_password)

	if req.ProfilePic != nil {
		profilePicUrl, err := s.centralService.UploadFile(*req.ProfilePic, customer.UserId+"-profile-"+req.ProfilePic.Filename)
		if err != nil {
			return err
		}
		customer.ProfilePicUrl = profilePicUrl
	} else {
		customer.ProfilePicUrl = "https://zinusoidal-fortune168.s3.ap-southeast-1.amazonaws.com/Illustration10.png"
	}

	err = s.database.RegisterCustomer(customer)
	if err != nil {
		return err
	}

	key := randomStringKey(20)

	err = sendEmailConfirmationLink(req.Email, key)
	if err != nil {
		return err
	}

	return s.database.InsertConfirmationKey(customer.UserId, key)

}

func (s *Service) ProviderRegister(req ProviderRegisterRequest) error {
	var err error
	provider := model.Provider{}
	var ws []model.WorkSchedule
	err = json.Unmarshal([]byte(req.WorkSchedule), &ws)
	if err != nil {
		return err
	}
	req.Schedule, err = model.ParseSchedule(ws)
	if err != nil {
		return err
	}
	smapping.FillStruct(&provider, smapping.MapFields(&req))
	var fortune []model.Fortune
	err = json.Unmarshal([]byte(req.Fortune), &fortune)
	if err != nil {
		return err
	}
	provider.FortuneList = fortune
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
	key := randomStringKey(20)

	if req.ProfilePic != nil {
		profilePicUrl, err := s.centralService.UploadFile(*req.ProfilePic, provider.UserId+"-profile-"+req.ProfilePic.Filename)
		if err != nil {
			return err
		}
		provider.ProfilePicUrl = profilePicUrl
	} else {
		provider.ProfilePicUrl = "https://zinusoidal-fortune168.s3.ap-southeast-1.amazonaws.com/Illustration10.png"
	}

	err = s.database.RegisterProvider(provider)
	if err != nil {
		return err
	}

	err = sendEmailConfirmationLink(req.Email, key)
	if err != nil {
		return err
	}

	return s.database.InsertConfirmationKey(provider.UserId, key)
}

func (s *Service) Login(req LoginRequest) (model.LoginQuery, error) {
	return s.database.Login(req.Username, req.Password)
}

func (s *Service) ConfirmEmail(key string) error {
	return s.database.ConfirmEmail(key)
}

func (s *Service) CheckPassword(userId, oldPassword, newPassword string) error {

	var err error

	err = s.database.CheckPassword(userId, oldPassword, newPassword)
	if err != nil {
		return err
	}
	return nil
}

func sendEmailConfirmationLink(email, key string) error {
	sender := viper.GetString("email.email")
	password := viper.GetString("email.password")
	mail := gomail.NewMessage()
	mail.SetHeader("From", sender)
	mail.SetHeader("Subject", "Email activation")
	mail.SetHeader("To", email)
	mail.SetBody("text/plain", "You have registered for Fortune168 service, the verification link is\n"+"http://ec2-13-229-67-156.ap-southeast-1.compute.amazonaws.com:"+viper.GetString("app.port")+"/confirm_email/"+key)
	d := gomail.NewDialer(viper.GetString("smtp.host"), viper.GetInt("smtp.port"), sender, password)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
	log.Println("Sending email....")
	return d.DialAndSend(mail)
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
	return b.String()
}
