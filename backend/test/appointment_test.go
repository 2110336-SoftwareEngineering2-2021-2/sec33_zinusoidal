package test

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo/model"
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

var appointmentTestcase = []MakeAppointmentTestcase{
	{ProviderId: "", Date: "54-565-565", Appointment: model.Appointment{
		AppointmentInfo: []model.AppointmentInfo{
			{
				FortuneType: "dating",
				Price:       456,
				Time:        []string{"18.26", "19.30"},
			},
		}, Information: []string{}, Value: []string{},
	},
		CustomerToken: "effsfdfafsc546s54cd.INFDSNFLSNF",
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
		CustomerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJQZDdjODVlMWEtZmJkYS00OTQ0LTdkYjUtZjg4MjExODE2OTZlIiwiZXhwIjoxNjU5ODAwMzM5fQ.r3zjlmIntblDwjtd8G2jKy0AhaQcn1si7Qp1NhZNl6A", /// valid providerTOken
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
		CustomerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJDYjNiZDlmYzUtYzA1YS00ZDQ2LTY5MjItOGU5Yjk5MWMzMTFjIiwiZXhwIjoxNjU5ODAwMzAwfQ.L5lvR41tPd_7CBC3D4z7S6kje9ap0guhNayiaDkdAYE", /// valid customerToken
		ResponseCode:  400,
	}, /// second test case, valid ProviderToken

	{ProviderId: "Pd7c85e1a-fbda-4944-7db5-f8821181696e", Date: "2021-01-02", Appointment: model.Appointment{
		AppointmentInfo: []model.AppointmentInfo{
			{
				FortuneType: "dating",
				Price:       456,
				Time:        []string{"18.56", "19.74"},
			},
		}, Information: []string{}, Value: []string{},
	},
		CustomerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJDYjNiZDlmYzUtYzA1YS00ZDQ2LTY5MjItOGU5Yjk5MWMzMTFjIiwiZXhwIjoxNjU5ODAwMzAwfQ.L5lvR41tPd_7CBC3D4z7S6kje9ap0guhNayiaDkdAYE", /// valid customerToken
		ResponseCode:  500,
	}, /// thrid test case, time format failed, valid token, request

	{ProviderId: "Pd7c85e1a-fbda-4944-7db5-f8821181696e", Date: "2021-01-02", Appointment: model.Appointment{
		AppointmentInfo: []model.AppointmentInfo{
			{
				FortuneType: "dating",
				Price:       456,
				Time:        []string{"18.30", "19.74"},
			},
		}, Information: []string{}, Value: []string{},
	},
		CustomerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJDYjNiZDlmYzUtYzA1YS00ZDQ2LTY5MjItOGU5Yjk5MWMzMTFjIiwiZXhwIjoxNjU5ODAwMzAwfQ.L5lvR41tPd_7CBC3D4z7S6kje9ap0guhNayiaDkdAYE", /// valid customerToken
		ResponseCode:  500,
	}, /// fourth test case, second time format failed

	{ProviderId: "Pd7c85e1a-fbda-4944-7db5-f8821181696e", Date: "2021-01-02", Appointment: model.Appointment{
		AppointmentInfo: []model.AppointmentInfo{
			{
				FortuneType: "dating",
				Price:       456,
				Time:        []string{"18.30", "19.30"},
			},
		}, Information: []string{"HELLO GUYS"}, Value: []string{"HELLO You guys"},
	},
		CustomerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJDYjNiZDlmYzUtYzA1YS00ZDQ2LTY5MjItOGU5Yjk5MWMzMTFjIiwiZXhwIjoxNjU5ODAwMzAwfQ.L5lvR41tPd_7CBC3D4z7S6kje9ap0guhNayiaDkdAYE", /// valid customerToken
		ResponseCode:  200,
	}, /// Fifth test case, everything work correctly

}

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
