package chat_repo

import (
	"context"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/chat_repo/model"
	"github.com/jinzhu/gorm"
)

type DB struct {
	database *gorm.DB
	client   *firestore.Client
}

func New(db *gorm.DB, client *firestore.Client) *DB {
	return &DB{database: db, client: client}
}

func createRoomId(id1, id2 string) string {
	if id1 < id2 {
		id1, id2 = id2, id1
	}
	return "R-" + id1 + "-" + id2
}

func (db *DB) SendMessage(senderId, receiverId, text string) error {
	roomId := createRoomId(senderId, receiverId)
	db.ensureRoom(senderId, roomId)
	db.ensureRoom(receiverId, roomId)

	ctx := context.Background()
	message := model.Message{
		MessageSentBy:   senderId,
		MessageSentTime: time.Now(),
		MessageText:     text,
	}
	_, err := db.client.Collection("chatRoom").Doc(roomId).Collection("message").NewDoc().Set(ctx, message)
	return err
}

func (db *DB) ensureRoom(userId, roomId string) {
	db.client.Collection("userChat").Doc(userId).Collection(roomId)
}
