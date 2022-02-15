package model

type Customer struct {
	UserId        string `gorm:"column:id"`
	Username      string `gorm:"column:username" json:"username"`
	FirstName     string `gorm:"column:first_name" json:"firstName"`
	LastName      string `gorm:"column:last_name" json:"lastName"`
	Nickname      string `gorm:"column:nickname" json:"nickname"`
	Email         string `gorm:"column:email" json:"email"`
	Password      string `gorm:"column:password"`
	CitizenId     string `gorm:"column:citizen_id" json:"citizenId"`
	ProfilePicUrl string `gorm:"column:profile_image" json:"profilePicUrl"`
	CreateAt      string `gorm:"column:create_datetime"`
	DeleteAt      string `gorm:"column:delete_datetime"`
}

type Fortune struct {
	FortuneType string `json:"fortuneType"`
	Price       int    `json:"price"`
}

type LoginQuery struct {
	UserId       string `gorm:"column:id"`
	Username     string `gorm:"column:username"`
	Password     string `gorm:"column:password"`
	FirstName    string `gorm:"column:first_name"`
	LastName     string `gorm:"column:last_name"`
	ProfileImage string `gorm:"column:profile_image"`
}

type Provider struct {
	UserId        string    `gorm:"column:id" `
	Username      string    `gorm:"column:username" json:"username"`
	FirstName     string    `gorm:"column:first_name" json:"firstName"`
	LastName      string    `gorm:"column:last_name" json:"lastName"`
	Email         string    `gorm:"column:email" json:"email"`
	Password      string    `gorm:"column:password"`
	FortuneList   []Fortune `json:"fortuneList"`
	ProfilePicUrl string    `gorm:"column:profile_image" json:"profilePicUrl"`
	CitizenId     string    `gorm:"column:citizen_id" json:"citizenId"`
	Biography     string    `gorm:"biography" json:"biography"`
	Schedule      string    `gorm:"column:schedule" json:"schedule"`
	CreateAt      string    `gorm:"column:create_datetime"`
	DeleteAt      string    `gorm:"column:delete_datetime"`
}

type LandingPageInfo struct {
	CustomerCnt int `gorm:"column:total_customer" json:"totalCustomer"`
	ProviderCnt int `gorm:"column:total_provider" json:"totalProvider"`
	FortuneCnt  int `gorm:"column:total_fortune_service" json:"totalFortuneService"`
}
