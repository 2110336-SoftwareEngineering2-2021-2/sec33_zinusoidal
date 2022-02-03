package profile

type ProviderEditRequest struct {
	FirstName      string   `json:"firstName"`
	LastName       string   `json:"lastName"`
	FortuneType    []string `json:"fortuneType"`
	ProfilePicUrl  string   `json:"profilePicUrl"`
	WorkExperience string   `json:"workExperience"`
	CitizenId      string   `json:"citizenId"`
}

type Logger struct {
	Log string `json:"log"`
}

type CustomerProfile struct {
	UserId        string `gorm:"column:id"`
	Username      string `gorm:"column:username" json:"username"`
	FirstName     string `gorm:"column:first_name" json:"firstName"`
	LastName      string `gorm:"column:last_name" json:"lastName"`
	Nickname      string `gorm:"column:nickname" json:"nickname"`
	Email         string `gorm:"column:email" json:"email"`
	CitizenId     string `gorm:"column:citizen_id" json:"citizenId"`
	ProfilePicUrl string `gorm:"column:profile_image" json:"profilePicUrl"`
}

type ProviderProfile struct {
	UserId         string   `gorm:"column:id" `
	FirstName      string   `gorm:"column:first_name" json:"firstName"`
	LastName       string   `gorm:"column:last_name" json:"lastName"`
	Email          string   `gorm:"column:email" json:"email"`
	Username       string   `gorm:"column:username" json:"username"`
	FortuneType    []string `json:"fortuneType"`
	ProfilePicUrl  string   `gorm:"column:profile_image" json:"profilePicUrl"`
	CitizenId      string   `gorm:"column:citizenId"`
	WorkExperience string   `json:"workExperience"`
}
