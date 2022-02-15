package auth

import (
	"mime/multipart"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
)

type CustomerRegisterRequest struct {
	Username   string                `json:"username" form:"username" binding:"required"`
	Password   string                `json:"password" form:"password" binding:"required"`
	Email      string                `json:"email" form:"email" binding:"required"`
	FirstName  string                `json:"firstName" form:"firstName" binding:"required"`
	LastName   string                `json:"lastName" form:"lastName" binding:"required"`
	ProfilePic *multipart.FileHeader `form:"profilePic"`
	CitizenId  string                `json:"citizenId" form:"citizenId"`
}

type ProviderRegisterRequest struct {
	Username     string                `json:"username" form:"username" binding:"required"`
	Password     string                `json:"password" form:"password" binding:"required"`
	Email        string                `json:"email" form:"email" binding:"required"`
	FirstName    string                `json:"firstName" form:"firstName" binding:"required"`
	LastName     string                `json:"lastName" form:"lastName" binding:"required"`
	Schedule     string                `json:"schedule" form:"schedule"`
	WorkSchedule []model.WorkSchedule  `json:"workSchedule"`
	Fortune      []model.Fortune       `json:"fortuneList"`
	ProfilePic   *multipart.FileHeader `form:"profilePic"`
	Biography    string                `json:"biography" form:"biography"`
	CitizenId    string                `json:"citizenId" form:"citizenId"`
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
