package test

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/magiconair/properties/assert"
	"github.com/spf13/viper"
)

func init() {
	viper.AddConfigPath("../configs")
	viper.SetConfigName("/config")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("[ERROR] Cannot read in viper config: %s", err)
	}
	DB = NewSQLConn() /// connect database
}

type LoginTestcase struct {
	Username     string
	Password     string
	ResponseCode int
}

var loginTestcases = []LoginTestcase{
	{"", "123456", 400}, {"kirkpig", "451312", 400}, {"ryuio", "456522", 400}, {"ryuio", "123456", 200},
}

func mockJsonPost(c *gin.Context, content interface{}) {
	c.Request.Method = "POST" // or PUT
	c.Request.Header.Set("Content-Type", "application/json")
	jsonbytes, _ := json.Marshal(content)
	// the request body must be an io.ReadCloser
	// the bytes buffer though doesn't implement io.Closer,
	// so you wrap it in a no-op closer
	c.Request.Body = io.NopCloser(bytes.NewBuffer(jsonbytes))
}

/**
test command
test
	go test
	go test -run TestLogin -v [for specific run]
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

		mockJsonPost(c, map[string]interface{}{
			"username": testcase.Username,
			"password": testcase.Password,
		})
		LoginHandler(c)

		assert.Equal(t, w.Code, testcase.ResponseCode)
		log.Printf("case ID: %d passed\n", id+1)
	}
}
