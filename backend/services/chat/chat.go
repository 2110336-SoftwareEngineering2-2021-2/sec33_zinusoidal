package chat

type Service struct {
	database Databaser
}

type Databaser interface {
	SendMessage(senderId, receiverId, message string) error
}

func NewService(database Databaser) *Service {
	return &Service{
		database: database,
	}
}

func (s *Service) SendMessage(senderId, receiverId, message string) error {
	return s.database.SendMessage(senderId, receiverId, message)
}

func (s *Service) Block(userId, blockedUserId string) error {
	return nil
}
