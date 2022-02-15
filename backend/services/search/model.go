package search

type SearchRequest struct {
	FortuneType []string `json:"fortuneType"`
	MinRating   float64  `json:"minRating"`
	MaxRating   float64  `json:"maxRating"`
	MinPrice    float64  `json:"minPrice"`
	MaxPrice    float64  `json:"maxPrice"`
}

type SearchResult struct {
	id        string
	firstName string
	lastName  string
}
type SearchDB struct {
	Id string
	// FirstName     string `json:"firstName"`
	// LastName      string `json:"lastName"`
	// ProfilePicUrl string `json:"profilePicUrl"`
	// Biography     string `json:"biography"`
	// WorkSchedule  string `json:"workSchedule"`
}
