package search

type SearchRequest struct {
	FortuneType string  `json:"fortuneType"`
	MinRating   float64 `json:"minRating"`
	MaxRating   float64 `json:"maxRating"`
	MinPrice    float64 `json:"minPrice"`
	MaxPrice    float64 `json:"maxPrice"`
}
