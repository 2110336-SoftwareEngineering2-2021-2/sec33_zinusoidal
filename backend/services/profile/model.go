package profile

import "github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"

type ProviderEditRequest struct {
	FirstName     string               `json:"firstName"`
	LastName      string               `json:"lastName"`
	Fortune       []model.Fortune      `json:"fortuneList"`
	Biography     string               `json:"biography"`
	Schedule      string               `json:"schedule"`
	WorkSchedule  []model.WorkSchedule `json:"workSchedule"`
	Email         string               `json:"email"`
	ProfilePicUrl string               `json:"profilePicUrl"`
}

type Logger struct {
	Log string `json:"log"`
}

type CustomerProfile struct {
	Username      string `gorm:"column:username" json:"username"`
	FirstName     string `gorm:"column:first_name" json:"firstName"`
	LastName      string `gorm:"column:last_name" json:"lastName"`
	ProfilePicUrl string `gorm:"column:profile_image" json:"profilePicUrl"`
	Email         string `gorm:"column:email" json:"email"`
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
	Username      string  `gorm:"column:username" json:"username"`
	FirstName     string  `gorm:"column:first_name" json:"firstName"`
	LastName      string  `gorm:"column:last_name" json:"lastName"`
	ProfilePicUrl string  `gorm:"column:profile_image" json:"profilePicUrl"`
	Email         string  `gorm:"column:email" json:"email"`
	FortuneType   string  `gorm:"column:fortune_type"`
	Price         int     `gorm:"column:price"`
	Biography     string  `gorm:"column:biography" json:"biography"`
	WorkSchedule  string  `gorm:"column:schedule" json:"schedule"`
	Rating        float64 `gorm:"column:rating" json:"rating"`
}
