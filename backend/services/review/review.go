package review

type Service struct {
	database Databaser
}

type Databaser interface {
	InsertReview(id string, score int, text string) error
}

func NewService(database Databaser) *Service {
	return &Service{
		database: database,
	}
}

func (s *Service) ReviewRating(req ReviewRatingRequest) error {
	return s.database.InsertReview(req.AppointmentId, req.Score, req.Text)
}
