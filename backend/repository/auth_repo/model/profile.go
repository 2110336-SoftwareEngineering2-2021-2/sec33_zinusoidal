package model

type Customer struct {
	UserId       string `gorm:"column:id"`
	Username     string `gorm:"column:username"`
	FirstName    string `gorm:"column:first_name"`
	LastName     string `gorm:"column:last_name"`
	Nickname     string `gorm:"column:nickname"`
	Birthday     string `gorm:"column:birthday"`
	Gender       int    `gorm:"column:gender"`
	Email        string `gorm:"column:email"`
	Password     string `gorm:"column:password"`
	ProfileImage string `gorm:"column:profile_image"`
	CreateAt     string `gorm:"column:create_datetime"`
	DeleteAt     string `gorm:"column:delete_datetime"`
}

type Provider struct {
	UserId       string `gorm:"column:id"`
	Username     string `gorm:"column:username"`
	FirstName    string `gorm:"column:first_name"`
	LastName     string `gorm:"column:last_name"`
	Nickname     string `gorm:"column:nickname"`
	Birthday     string `gorm:"column:birthday"`
	Gender       int    `gorm:"column:gender"`
	Email        string `gorm:"column:email"`
	Password     string `gorm:"column:password"`
	ProfileImage string `gorm:"column:profile_image"`
	CreateAt     string `gorm:"column:create_datetime"`
	DeleteAt     string `gorm:"column:delete_datetime"`
}
