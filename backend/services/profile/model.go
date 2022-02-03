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
