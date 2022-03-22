package model

import "time"

type Message struct {
	MessageSentBy   string    `firestore:"messageSentBy"`
	MessageSentTime time.Time `firestore:"messageSentTime"`
	MessageText     string    `firestore:"messageText"`
}
