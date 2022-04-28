package test

import (
	"log"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/spf13/viper"
)

var DB *gorm.DB

func NewSQLConn() *gorm.DB {
	conf := mysql.Config{
		DBName: viper.GetString("mysql.db_name"),
		User:   viper.GetString("mysql.username"),
		Passwd: viper.GetString("mysql.password"),
		Net:    viper.GetString("mysql.net"),
		Addr:   viper.GetString("mysql.host") + ":" + viper.GetString("mysql.port"),
		Loc:    time.Local,
	}
	conn, err := gorm.Open("mysql", conf.FormatDSN())
	if err != nil {
		log.Println("connection error")
		log.Fatalln(err.Error())
	}
	log.Println("db connected!! 🎉")
	return conn
}
