package search

type SearchRequest struct {
	FortuneType []string `json:"fortuneType"`
	MinRating   float64  `json:"minRating"`
	MaxRating   float64  `json:"maxRating"`
	MinPrice    float64  `json:"minPrice"`
	MaxPrice    float64  `json:"maxPrice"`
	Keyword     string   `json:"keyword"`
}

type SearchResult struct {
	id        string
	firstName string
	lastName  string
}
type SearchDB struct {
	Id string `gorm:"column:id"`
}

type LandingPageInfo struct {
	CustomerCnt int `gorm:"column:total_customer" json:"totalCustomer"`
	ProviderCnt int `gorm:"column:total_provider" json:"totalProvider"`
	FortuneCnt  int `gorm:"column:total_fortune_service" json:"totalFortuneService"`
}
