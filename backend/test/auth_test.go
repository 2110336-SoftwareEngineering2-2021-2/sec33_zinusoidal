package test

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/magiconair/properties/assert"
	"github.com/spf13/viper"
)

func init() {
	viper.AddConfigPath("../configs")
	viper.SetConfigName("/config")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("[ERROR] Cannot read in viper config: %s", err)
	}
	db = NewSQLConn() /// connect database
}

func MockJsonPost(c *gin.Context, content interface{}) {
	c.Request.Method = "POST" // or PUT
	c.Request.Header.Set("Content-Type", "application/json")
	jsonbytes, _ := json.Marshal(content)
	// the request body must be an io.ReadCloser
	// the bytes buffer though doesn't implement io.Closer,
	// so you wrap it in a no-op closer
	c.Request.Body = io.NopCloser(bytes.NewBuffer(jsonbytes))
}

func TestPing(t *testing.T) {
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	c.Request = &http.Request{
		Header: make(http.Header),
	}

	MockJsonPost(c, map[string]interface{}{
		"username": "ryuio",
		"password": "123456",
	})
	log.Println("OK_________________________________")
	LoginHandler(c)

	assert.Equal(t, w.Code, 400)

}

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
