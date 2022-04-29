package test

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/jwt"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo/model"
	"github.com/gin-gonic/gin"
	"github.com/magiconair/properties/assert"
	"github.com/spf13/viper"
)

var test_provider_id = "Pd7c85e1a-fbda-4944-7db5-f8821181696e"
var test_customer_id = "Cb3bd9fc5-c05a-4d46-6922-8e9b991c311c"
var test_provider_token string
var test_customer_token string

func init() {
	viper.AddConfigPath("../configs")
	viper.SetConfigName("/config")
	var err error

	if err = viper.ReadInConfig(); err != nil {
		log.Fatalf("[ERROR] Cannot read in viper config: %s", err)
	}
	DB = NewSQLConn() /// connect database
	test_provider_token, err = jwt.CreateToken(test_provider_id)
	if err != nil {
		log.Fatalf("error jwt %s", err.Error())
	}
	test_customer_token, err = jwt.CreateToken(test_customer_id)
	if err != nil {
		log.Fatalf("error jwt %s", err.Error())
	}
	make_test_case()
}

var appointmentTestcase []MakeAppointmentTestcase

func make_test_case() {
	appointmentTestcase = []MakeAppointmentTestcase{
		{ProviderId: "", Date: "54-565-565", Appointment: model.Appointment{
			AppointmentInfo: []model.AppointmentInfo{
				{
					FortuneType: "dating",
					Price:       456,
					Time:        []string{"18.26", "19.30"},
				},
			}, Information: []string{}, Value: []string{},
		},
			CustomerToken: "effsfdfafsc546s54cd.Fakenonsensetoken",
			ResponseCode:  401,
		}, /// first test case, just random false info, verify fail

		{ProviderId: "", Date: "54-565-565", Appointment: model.Appointment{
			AppointmentInfo: []model.AppointmentInfo{
				{
					FortuneType: "dating",
					Price:       456,
					Time:        []string{"18.26", "19.30"},
				},
			}, Information: []string{}, Value: []string{},
		},
			CustomerToken: test_provider_token, /// valid providerTOken
			ResponseCode:  400,
		}, /// second test case, valid ProviderToken

		{ProviderId: "", Date: "2021-01-02", Appointment: model.Appointment{
			AppointmentInfo: []model.AppointmentInfo{
				{
					FortuneType: "dating",
					Price:       456,
					Time:        []string{"18.56", "19.74"},
				},
			}, Information: []string{}, Value: []string{},
		},
			CustomerToken: test_customer_token, /// valid customerToken
			ResponseCode:  400,
		}, /// second test case, valid ProviderToken

		{ProviderId: test_provider_id, Date: "2021-01-02", Appointment: model.Appointment{
			AppointmentInfo: []model.AppointmentInfo{
				{
					FortuneType: "dating",
					Price:       456,
					Time:        []string{"18.56", "19.74"},
				},
			}, Information: []string{}, Value: []string{},
		},
			CustomerToken: test_customer_token,
			ResponseCode:  500,
		}, /// thrid test case, time format failed, valid token, request

		{ProviderId: test_provider_id, Date: "2021-01-02", Appointment: model.Appointment{
			AppointmentInfo: []model.AppointmentInfo{
				{
					FortuneType: "dating",
					Price:       456,
					Time:        []string{"18.30", "19.74"},
				},
			}, Information: []string{}, Value: []string{},
		},
			CustomerToken: test_customer_token,
			ResponseCode:  500,
		}, /// fourth test case, second time format failed

		{ProviderId: test_provider_id, Date: "2021-01-02", Appointment: model.Appointment{
			AppointmentInfo: []model.AppointmentInfo{
				{
					FortuneType: "dating",
					Price:       456,
					Time:        []string{"18.30", "19.30"},
				},
			}, Information: []string{"HELLO GUYS"}, Value: []string{"HELLO You guys"},
		},
			CustomerToken: test_customer_token,
			ResponseCode:  200,
		}, /// Fifth test case, everything work correctly

	}
}

// ref: https://stackoverflow.com/questions/57733801/how-to-set-mock-gin-context-for-bindjson/67034058#67034058
// see this, if you want to mock form-data https://stackoverflow.com/questions/66952761/how-to-unit-test-a-go-gin-handler-function
func mockJsonPostWithBearer(c *gin.Context, content MakeAppointmentTestcase, token string) {
	c.Request.Method = "POST" // or PUT
	c.Request.Header.Set("Content-Type", "application/json")
	jsonbytes, _ := json.Marshal(content)
	c.Request.Header.Add("authorization", "Bearer "+token)
	// the request body must be an io.ReadCloser
	// the bytes buffer though doesn't implement io.Closer,
	// so you wrap it in a no-op closer
	c.Request.Body = io.NopCloser(bytes.NewBuffer(jsonbytes))
}

/**
 * assumption: assumed that in database, there is username "ryuio" with password "123456"
 * and username "kirkpig" is not existed
**/

type MakeAppointmentTestcase struct {
	ProviderId    string            `json:"providerId" binding:"required"`
	Date          string            `json:"date" binding:"required"`
	Appointment   model.Appointment `json:"appointment"`
	CustomerToken string
	ResponseCode  int
}

/**
Run following commands to get html coverage
	go test -coverprofile=coverage
	go tool cover -func=coverage
	go tool cover -html=coverage
	go tool cover -html=coverage -o coverage.html
*/
func TestAppointment(t *testing.T) {
	for id, testcase := range appointmentTestcase {
		w := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(w)

		c.Request = &http.Request{
			Header: make(http.Header),
		}

		mockJsonPostWithBearer(c, testcase, testcase.CustomerToken)
		MakeAppointmentHandler(c)

		assert.Equal(t, w.Code, testcase.ResponseCode)
		log.Printf("case ID: %d passed\n", id+1)
	}
}
