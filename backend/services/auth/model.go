package auth

import "github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"

type CustomerRegisterRequest struct {
	Username      string `json:"username" binding:"required"`
	Password      string `json:"password" binding:"required"`
	Email         string `json:"email" binding:"required"`
	FirstName     string `json:"firstName" binding:"required"`
	LastName      string `json:"lastName" binding:"required"`
	ProfilePicUrl string `json:"profilePicUrl"`
	CitizenId     string `json:"citizenId"`
}

type ProviderRegisterRequest struct {
	Username      string          `json:"username" binding:"required"`
	Password      string          `json:"password" binding:"required"`
	Email         string          `json:"email" binding:"required"`
	FirstName     string          `json:"firstName" binding:"required"`
	LastName      string          `json:"lastName" binding:"required"`
	Schedule      string          `json:"schedule"`
	Fortune       []model.Fortune `json:"fortuneList"`
	ProfilePicUrl string          `json:"profilePicUrl"`
	Biography     string          `json:"biography"`
	CitizenId     string          `json:"citizenId"`
}

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type Logger struct {
	Log string `json:"log"`
}
