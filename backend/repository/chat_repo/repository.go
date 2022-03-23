package chat_repo

import (
	"context"
	"errors"
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

func (db *DB) SendMessage(senderId, receiverId, text string) error {
	if !db.isValidId(receiverId) {
		return errors.New("invalid receiver id")
	}
	roomId := createRoomId(senderId, receiverId)
	err := db.ensureRoom(senderId, receiverId, roomId)
	if err != nil {
		return errors.New("failed to create room " + err.Error())
	}
	err = db.ensureRoom(receiverId, senderId, roomId)
	if err != nil {
		return errors.New("failed to create room " + err.Error())
	}

	if text == "" {
		return nil
	}

	ctx := context.Background()
	message := model.Message{
		MessageSentBy:   senderId,
		MessageSentTime: time.Now(),
		MessageText:     text,
	}
	_, err = db.client.Collection("chatRoom").Doc(roomId).Collection("message").NewDoc().Set(ctx, message)
	return err
}

func (db *DB) ensureRoom(userId, otherId, roomId string) error {
	if db.roomExist(roomId) {
		return nil
	}
	ctx := context.Background()

	_, err := db.client.Collection("userChat").Doc(userId).Collection("room").Doc(roomId).Set(ctx, map[string]interface{}{
		"createdAt":   time.Now(),
		"otherUserId": otherId,
	})
	if err != nil {
		return err
	}

	_, err = db.client.Collection("chatRoom").Doc(roomId).Set(ctx, map[string]interface{}{
		"isBlocked": false,
		"createdAt": time.Now(),
	})

	return err
}

func (db *DB) roomExist(roomId string) bool {
	ctx := context.Background()
	_, err := db.client.Collection("userChat").Doc(roomId).Get(ctx)
	return err == nil
}

func (db *DB) isValidId(userId string) bool {
	isExist := `SELECT COUNT(*) as cnt from fortune_user WHERE id = ?`
	var result struct {
		Cnt int `gorm:"cnt"`
	}
	err := db.database.Raw(isExist, userId).Scan(&result).Error
	if err != nil {
		return false
	}

	return result.Cnt == 1
}

func createRoomId(id1, id2 string) string {
	if id1 < id2 {
		id1, id2 = id2, id1
	}
	return "R_" + id1 + "_" + id2
}
