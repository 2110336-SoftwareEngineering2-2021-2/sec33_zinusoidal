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
	UserId        string
	Username      string
	FirstName     string
	LastName      string
	Email         string
	CitizenId     string
	ProfilePicUrl string
}

type ProviderProfile struct {
	UserId         string
	FirstName      string
	LastName       string
	Email          string
	Username       string
	FortuneType    []string
	CitizenId      string
	WorkExperience string
	WorkSchedule   string
}
