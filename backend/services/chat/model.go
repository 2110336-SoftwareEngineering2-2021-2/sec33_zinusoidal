package chat

type BlockRequest struct {
	BlockedUserId string `json:"blockedUserId" binding:"required"`
}
