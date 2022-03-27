package chat

type SendMessageRequest struct {
	ReceiverId string `json:"receiverId"`
	Message    string `json:"message"`
}
type BlockRequest struct {
	BlockedUserId string `json:"blockedUserId" binding:"required"`
}
