package chat

type SendMessageRequest struct {
	ReceiverId string `json:"receiverId" binding:"required"`
	Message    string `json:"message"`
}
type BlockRequest struct {
	BlockedUserId string `json:"blockedUserId" binding:"required"`
}
