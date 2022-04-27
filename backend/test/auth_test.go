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

// ref: https://stackoverflow.com/questions/57733801/how-to-set-mock-gin-context-for-bindjson/67034058#67034058
// see this, if you want to mock form-data https://stackoverflow.com/questions/66952761/how-to-unit-test-a-go-gin-handler-function
func MockJsonPost(c *gin.Context, content interface{}) {
	c.Request.Method = "POST" // or PUT
	c.Request.Header.Set("Content-Type", "application/json")
	jsonbytes, _ := json.Marshal(content)
	// the request body must be an io.ReadCloser
	// the bytes buffer though doesn't implement io.Closer,
	// so you wrap it in a no-op closer
	c.Request.Body = io.NopCloser(bytes.NewBuffer(jsonbytes))
}

/**
 * assumption: assumed that in database, there is username "ryuio" with password "123456"
 * and username "kirkpig" is not existed
**/
type LoginTestcase struct {
	Username     string
	Password     string
	ResponseCode int
}

var loginTestcases = []LoginTestcase{
	{"", "123456", 400}, {"kirkpig", "451312", 400}, {"ryuio", "456522", 400}, {"ryuio", "123456", 200},
}

/**
test command
test
	go test
coverage
	go test -cover
	go test -coverprofile=coverage
	go tool cover -func=coverage
	go tool cover -html=coverage
	go tool cover -html=coverage -o coverage.html
*/

func TestLogin(t *testing.T) {
	for id, testcase := range loginTestcases {
		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)

		c.Request = &http.Request{
			Header: make(http.Header),
		}

		MockJsonPost(c, map[string]interface{}{
			"username": testcase.Username,
			"password": testcase.Password,
		})
		LoginHandler(c)

		assert.Equal(t, w.Code, testcase.ResponseCode)
		log.Printf("case ID: %d passed\n", id+1)
	}
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
