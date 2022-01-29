package auth

type CustomerRegisterRequest struct {
	Username     string `json:"username" binding:"required"`
	Password     string `json:"password" binding:"required"`
	Email        string `json:"email" binding:"required"`
	FirstName    string `json:"firstName" binding:"required"`
	LastName     string `json:"lastName" binding:"required"`
	Nickname     string `json:"nickname" binding:"required"`
	Birthdate    string `json:"birthdate" binding:"required"`
	Address      string `json:"address"`
	PhoneNumber  string `json:"phoneNumber"`
	CarRegNumber string `json:"carRegNumber"`
	BloodType    int8   `json:"bloodType"`
	Gender       int8   `json:"gender"`
}

type ProviderRegisterRequest struct {
	Username       string   `json:"username" binding:"required"`
	Password       string   `json:"password" binding:"required"`
	Email          string   `json:"email" binding:"required"`
	FirstName      string   `json:"firstName" binding:"required"`
	LastName       string   `json:"lastName" binding:"required"`
	Birthdate      string   `json:"birthdate" binding:"required"`
	FortuneType    []string `json:"fortuneType"`
	Address        string   `json:"address"`
	PhoneNumber    string   `json:"phoneNumber"`
	WorkExperience string   `json:"workExperience"`
}
