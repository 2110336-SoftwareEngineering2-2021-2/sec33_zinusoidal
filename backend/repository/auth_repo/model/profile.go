package model

type Customer struct {
	UserId        string `gorm:"column:id"`
	Username      string `gorm:"column:username" json:"username"`
	FirstName     string `gorm:"column:first_name" json:"firstName"`
	LastName      string `gorm:"column:last_name" json:"lastName"`
	Nickname      string `gorm:"column:nickname" json:"nickname"`
	Email         string `gorm:"column:email" json:"email"`
	Password      string `gorm:"column:password"`
	CitizenId     string `gorm:"column:citizenId"`
	ProfilePicUrl string `gorm:"column:profile_image" json:"profilePicUrl"`
	CreateAt      string `gorm:"column:create_datetime"`
	DeleteAt      string `gorm:"column:delete_datetime"`
}

type Provider struct {
	UserId         string   `gorm:"column:id" `
	Username       string   `gorm:"column:username" json:"username"`
	FirstName      string   `gorm:"column:first_name" json:"firstName"`
	LastName       string   `gorm:"column:last_name" json:"lastName"`
	Email          string   `gorm:"column:email" json:"email"`
	Password       string   `gorm:"column:password"`
	FortuneType    []string `json:"fortuneType"`
	ProfilePicUrl  string   `gorm:"column:profile_image" json:"profilePicUrl"`
	CitizenId      string   `gorm:"column:citizenId"`
	WorkExperience string   `json:"workExperience"`
	CreateAt       string   `gorm:"column:create_datetime"`
	DeleteAt       string   `gorm:"column:delete_datetime"`
}