package model

type Customer struct {
	UserId        string `gorm:"column:id"`
	Username      string `gorm:"column:username" json:"username"`
	FirstName     string `gorm:"column:first_name" json:"firstName"`
	LastName      string `gorm:"column:last_name" json:"lastName"`
	Nickname      string `gorm:"column:nickname" json:"nickname"`
	Birthday      string `gorm:"column:birthday" json:"birthday"`
	Gender        int    `gorm:"column:gender" json:"gender"`
	Email         string `gorm:"column:email" json:"email"`
	Password      string `gorm:"column:password"`
	ProfilePicUrl string `gorm:"column:profile_image" json:"profilePicUrl"`
	CreateAt      string `gorm:"column:create_datetime"`
	DeleteAt      string `gorm:"column:delete_datetime"`
}

type Provider struct {
	UserId         string   `gorm:"column:id" `
	Username       string   `gorm:"column:username" json:"username"`
	FirstName      string   `gorm:"column:first_name" json:"firstName"`
	LastName       string   `gorm:"column:last_name" json:"lastName"`
	Birthday       string   `gorm:"column:birthday"`
	Email          string   `gorm:"column:email" json:"email"`
	Password       string   `gorm:"column:password"`
	FortuneType    []string `json:"fortuneType"`
	ProfilePicUrl  string   `gorm:"column:profile_image" json:"profilePicUrl"`
	Address        string   `json:"address"`
	PhoneNumber    string   `json:"phoneNumber"`
	WorkExperience string   `json:"workExperience"`
	CreateAt       string   `gorm:"column:create_datetime"`
	DeleteAt       string   `gorm:"column:delete_datetime"`
}
