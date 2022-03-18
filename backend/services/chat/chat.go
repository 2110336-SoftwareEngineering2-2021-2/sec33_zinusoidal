package chat

type Service struct {
	database Databaser
}

type Databaser interface {
}

type Servicer interface {
	Block(req BlockRequest) error
}

func NewService() *Service {
	return &Service{}
}

func (s *Service) Block(userId, blockedUserId string) error {
	return nil

}
