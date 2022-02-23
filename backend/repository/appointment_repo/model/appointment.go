package model

import (
	"strconv"
	"time"
)

type Appointment struct {
	AppointmentId string   `json:"appointmentId"`
	FortuneType   string   `json:"fortuneType"`
	TotalPrice    int      `json:"totalPrice"`
	Time          []string `json:"time"`
	Information   []string `json:"information"`
	Value         []string `json:"value"`
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
	return hours, mins, nil
}

var layout = "2020-04-12"

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
