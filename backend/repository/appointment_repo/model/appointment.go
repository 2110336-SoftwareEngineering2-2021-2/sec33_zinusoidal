package model

import (
	"errors"
	"fmt"
	"strconv"
	"time"
)

type AppointmentInfo struct {
	FortuneType string   `json:"fortuneType"`
	Price       int      `json:"price"`
	Time        []string `json:"time"`
}

type Appointment struct {
	AppointmentInfo []AppointmentInfo `json:"appointmentList"`
	Information     []string          `json:"information"`
	Value           []string          `json:"value"`
}

type AppointmentNoti struct {
	AppointmentTime []AppointmentTime `firestore:"appointment_time"`
	CustomerId      string            `firestore:"customerID"`
	ProviderId      string            `firestore:"providerID"`
	Status          int               `firestore:"status"`
	TotalPrice      int               `firestore:"total_price"`
	Information     []string          `firestore:"information"`
	Value           []string          `firestore:"value"`
	Services        []Service         `firestore:"service"`
	CreatedAt       time.Time         `firestore:"created_at"`
	UpdatedAt       time.Time         `firestore:"updated_at"`
}

type Service struct {
	FortuneType string `firestore:"service_type"`
	Price       int    `firestore:"price"`
}

type AppointmentTime struct {
	StartTime time.Time `firestore:"start_time"`
	EndTime   time.Time `firestore:"end_time"`
}

func GetTimes(tim string) (int, int, error) {
	hours, err := strconv.Atoi(tim[:2])
	if err != nil {
		return -1, -1, err
	}

	mins, err := strconv.Atoi(tim[3:])
	if err != nil {
		return -1, -1, err
	}
	if (mins == 59 && hours != 23) || !(mins == 30 || mins == 0) || (hours > 23) {
		return -1, -1, errors.New("invalid format " + fmt.Sprintf("%d", hours) + ":" + fmt.Sprintf("%d", mins))
	}

	return hours, mins, nil
}

var layout = "2006-01-02"

func ParseToTime(tims, date string) (time.Time, error) {
	t, err := time.Parse(layout, date)
	if err != nil {
		return t, err
	}
	hours, min, err := GetTimes(tims)
	if err != nil {
		return t, err
	}
	return time.Date(t.Year(), t.Month(), t.Day(), hours, min, 0, 0, time.Local), nil
}
