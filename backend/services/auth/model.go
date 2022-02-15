package auth

import (
	"mime/multipart"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
)

type CustomerRegisterRequest struct {
	Username   string                `form:"username" binding:"required"`
	Password   string                `form:"password" binding:"required"`
	Email      string                `form:"email" binding:"required"`
	FirstName  string                `form:"firstName" binding:"required"`
	LastName   string                `form:"lastName" binding:"required"`
	ProfilePic *multipart.FileHeader `form:"profilePic"`
	CitizenId  string                `form:"citizenId"`
}

type ProviderRegisterRequest struct {
	Username     string                `form:"username" binding:"required"`
	Password     string                `form:"password" binding:"required"`
	Email        string                `form:"email" binding:"required"`
	FirstName    string                `form:"firstName" binding:"required"`
	LastName     string                `form:"lastName" binding:"required"`
	Schedule     string                `form:"schedule"`
	WorkSchedule []model.WorkSchedule  `json:"workSchedule"`
	Fortune      []model.Fortune       `json:"fortuneList"`
	ProfilePic   *multipart.FileHeader `form:"profilePic"`
	Biography    string                `form:"biography"`
	CitizenId    string                `form:"citizenId"`
}

type ProviderRegisterTestRequest struct {
	WorkSchedule []model.WorkSchedule `json:"workSchedule"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Logger struct {
	Log string `json:"log"`
}
