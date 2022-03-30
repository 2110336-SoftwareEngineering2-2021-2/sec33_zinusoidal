package review

import "github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/review_repo"

type Service struct {
	database Databaser
}

type Databaser interface {
	InsertReview(id string, score int, text string) error
	GetReview(id string) ([]review_repo.ReviewItem, error)
}

func NewService(database Databaser) *Service {
	return &Service{
		database: database,
	}
}

func (s *Service) ReviewRating(req ReviewRatingRequest) error {
	return s.database.InsertReview(req.AppointmentId, req.Score, req.Text)
}

func (s *Service) GetReviewQuery(userId string) ([]review_repo.ReviewItem, error) {
	return s.database.GetReview(userId)
}
