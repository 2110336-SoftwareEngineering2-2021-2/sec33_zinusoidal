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
	Username      string
	FirstName     string
	LastName      string
	ProfilePicUrl string
}

type ProviderProfile struct {
	UserId         string
	FirstName      string
	LastName       string
	Email          string
	Username       string
	FortuneType    []string
	WorkExperience string
	WorkSchedule   string
}
