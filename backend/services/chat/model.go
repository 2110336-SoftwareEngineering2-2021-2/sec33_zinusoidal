package chat

type SendMessageRequest struct {
	ReceiverId string `json:"receiverId"`
	Message    string `json:"message"`
}
