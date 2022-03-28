package model

import "time"

type Message struct {
	MessageSentBy   string    `firestore:"messageSentBy"`
	MessageSentTime time.Time `firestore:"messageSentTime"`
	MessageText     string    `firestore:"messageText"`
}

type ChatRoom struct {
	BlockedBy string `firestore:"blockedBy"`
	IsBlocked bool   `firestore:"isBlocked"`
}
