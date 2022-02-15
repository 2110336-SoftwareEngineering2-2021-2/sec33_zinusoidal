package profile

import (
	"mime/multipart"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
)

type ProviderEditRequest struct {
	FirstName     string                `json:"firstName"`
	LastName      string                `json:"lastName"`
	Fortune       []model.Fortune       `json:"fortuneList"`
	Biography     string                `json:"biography"`
	Schedule      string                `json:"schedule"`
	WorkSchedule  []model.WorkSchedule  `json:"workSchedule"`
	Email         string                `json:"email"`
	ProfilePicUrl string                `json:"profilePicUrl"`
	ProfilePic    *multipart.FileHeader `form:"profilePic"`
}

type Logger struct {
	Log string `json:"log"`
}

type CustomerProfile struct {
	Username      string `json:"username"`
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	ProfilePicUrl string `json:"profilePicUrl"`
	Email         string `json:"email"`
}

type ProviderProfile struct {
	Username      string               `json:"username"`
	FirstName     string               `json:"firstName"`
	LastName      string               `json:"lastName"`
	ProfilePicUrl string               `json:"profilePicUrl"`
	Email         string               `json:"email"`
	Fortune       []model.Fortune      `json:"fortuneList"`
	Biography     string               `json:"biography"`
	WorkSchedule  []model.WorkSchedule `json:"workSchedule"`
	Rating        float64              `json:"rating"`
}

type ProviderDB struct {
	Username      string `json:"username"`
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	ProfilePicUrl string `json:"profilePicUrl"`
	Email         string `json:"email"`
	FortuneType   string
	Price         int
	Biography     string  `json:"biography"`
	WorkSchedule  string  `json:"schedule"`
	Rating        float64 `json:"rating"`
}
