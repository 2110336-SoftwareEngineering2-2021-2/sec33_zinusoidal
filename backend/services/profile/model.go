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
	Username      string `json:"username"`
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	ProfilePicUrl string `json:"profilePicUrl"`
}

type ProviderProfile struct {
	UserId         string
	FirstName      string   `json:"firstName"`
	LastName       string   `json:"lastName"`
	Email          string   `json:"email"`
	Username       string   `json:"username"`
	FortuneType    []string `json:"fortuneType"`
	WorkExperience string   `json:"workExperience"`
	WorkSchedule   string   `json:"workSchedule"`
}
