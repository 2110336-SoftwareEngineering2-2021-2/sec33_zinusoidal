package search

type Service struct {
	database Databaser
}

type Databaser interface {
}

type Servicer interface {
	Search(SearchRequest) error
}

func NewService(database Databaser) *Service {
	return &Service{database: database}
}

func Search(req SearchRequest) error {
	return nil
}
