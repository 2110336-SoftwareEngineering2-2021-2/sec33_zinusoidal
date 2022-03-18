package chat_repo

import (
	"cloud.google.com/go/firestore"
	"github.com/jinzhu/gorm"
)

type DB struct {
	database *gorm.DB
	client   *firestore.Client
}

func New(db *gorm.DB, client *firestore.Client) *DB {
	return &DB{database: db, client: client}
}

func (db *DB) SendMessage(senderId, receiverId, message string) error {
	return nil
}
