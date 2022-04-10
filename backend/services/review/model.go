package review

import "github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/review_repo"

type ReviewRatingRequest struct {
	AppointmentId string `json:"appointmentId"`
	Score         int    `json:"score"`
	Text          string `json:"text"`
}

type ProviderReview struct {
	ReviewList []review_repo.ReviewItem `json:"reviewList"`
}
