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

	if text == "" {
		return nil
	}

	ctx := context.Background()
	sendTime := time.Now()
	message := model.Message{
		MessageSentBy:   senderId,
		MessageSentTime: sendTime,
		MessageText:     text,
	}
	_, err = db.client.Collection("chatRoom").Doc(roomId).Collection("message").NewDoc().Set(ctx, message)

	if err != nil {
		return err
	}

	return db.updatedRoom(senderId, receiverId, roomId, sendTime)
}

func (db *DB) updatedRoom(userId, senderId, roomId string, sendTime time.Time) error {
	ctx := context.Background()
	_, err := db.client.Collection("chatRoom").Doc(roomId).Update(ctx, []firestore.Update{
		{
			Path:  "updatedAt",
			Value: sendTime,
		},
	})

	if err != nil {
		return err
	}

	_, err = db.client.Collection("userChat").Doc(userId).Collection("room").Doc(roomId).Update(ctx, []firestore.Update{
		{
			Path:  "updatedAt",
			Value: sendTime,
		},
	})

	if err != nil {
		return err
	}

	_, err = db.client.Collection("userChat").Doc(senderId).Collection("room").Doc(roomId).Update(ctx, []firestore.Update{
		{
			Path:  "updatedAt",
			Value: sendTime,
		},
	})

	return err
}

func (db *DB) ensureRoom(userId, otherId, roomId string) error {
	if db.roomExist(roomId) {
		return nil
	}
	ctx := context.Background()
	createdTime := time.Now()

	_, err := db.client.Collection("userChat").Doc(userId).Collection("room").Doc(roomId).Set(ctx, map[string]interface{}{
		"createdAt":   createdTime,
		"updatedAt":   createdTime,
		"otherUserId": otherId,
	})
	if err != nil {
		return err
	}
	_, err = db.client.Collection("userChat").Doc(otherId).Collection("room").Doc(roomId).Set(ctx, map[string]interface{}{
		"createdAt":   time.Now(),
		"updatedAt":   createdTime,
		"otherUserId": userId,
	})
	if err != nil {
		return err
	}

	_, err = db.client.Collection("chatRoom").Doc(roomId).Set(ctx, map[string]interface{}{
		"isBlocked": false,
		"blockedBy": "",
		"updatedAt": createdTime,
		"createdAt": createdTime,
	})
	return err
}

func (db *DB) roomExist(roomId string) bool {
	ctx := context.Background()
	_, err := db.client.Collection("chatRoom").Doc(roomId).Get(ctx)
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

func (db *DB) Block(blockerId, blockedId string) error {

	ctx := context.Background()

	roomId := createRoomId(blockedId, blockerId)

	if !db.roomExist(roomId) {
		db.ensureRoom(blockerId, blockedId, roomId)
	}

	_, err := db.client.Collection("chatRoom").Doc(roomId).Update(ctx, []firestore.Update{
		{
			Path:  "isBlocked",
			Value: true,
		},
		{
			Path:  "updatedAt",
			Value: time.Now(),
		},
		{
			Path:  "blockedBy",
			Value: blockerId,
		},
	})

	return err
}

func (db *DB) Unblock(userId, unblockedId string) error {

	ctx := context.Background()

	roomId := createRoomId(userId, unblockedId)

	if !db.roomExist(roomId) {
		return errors.New("No chatroom")
	}

	_, err := db.client.Collection("chatRoom").Doc(roomId).Update(ctx, []firestore.Update{
		{
			Path:  "isBlocked",
			Value: false,
		},
		{
			Path:  "updatedAt",
			Value: time.Now(),
		},
		{
			Path:  "blockedBy",
			Value: "",
		},
	})

	return err
}

func createRoomId(id1, id2 string) string {
	if id1 < id2 {
		id1, id2 = id2, id1
	}
	return "R_" + id1 + "_" + id2
}
