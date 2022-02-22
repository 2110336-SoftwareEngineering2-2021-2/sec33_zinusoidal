package schedule

import (
	"fmt"
	"time"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
)

type Service struct {
	database Databaser
}

type Databaser interface {
}

type Servicer interface {
}

func NewService() *Service {
	return &Service{}
}

//get results an array of red n green
func (s *Service) GetWorkingDay(month, year int) ([]WorkingDay, error) {
	firstOfMonth := time.Date(year, time.Month(month), 1, 1, 10, 30, 0, time.UTC)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)

	fmt.Println("FOM", firstOfMonth)
	fmt.Println("LOM", lastOfMonth)

	weekday := firstOfMonth.Weekday()

	fmt.Println("weekday", weekday)
	//get Daily Schedule
	var dailySchedule []model.WorkSchedule
	t := firstOfMonth

	var results []WorkingDay

	//loop each day in week
	for i := 1; i < 8; i++ {

		check := t.AddDate(0, 0, i)
		fmt.Println("check", check)

		var currentDay string
		//get CurrentDay from check

		for _, day := range dailySchedule {
			if day.Day == currentDay {
				fmt.Println("daily day", day)
				var work WorkingDay

				//get Date from 'check'
				var date int = 0
				work.Date = date
				work.TimeList = day.TimeList
				// work = ["date": 31, "TimeList" : [[]] } ]
				results = append(results, work)
			}

		}

	}

	var err error
	return results, err
}

func (s *Service) RemoveBooked(w []WorkingDay, userId string) (ScheduleDto, error) {

	//get appointment of userId []
	var appointment []string

	//remove not avail
	for _, appoint := range appointment {
		fmt.Println("Appointment", appoint)
		//for every appointment -> move to not_avail

	}

	//if avail_time empty -> move to not avail day

	var err error

	var ret ScheduleDto
	return ret, err
}

func (s *Service) GetApt(date, month, year int, userId string) ([]Appointment, error) {

	//get appointment of userId []
	var dailyAppointment []Appointment

	//get appointment list from db
	var apt Appointment
	apt.Topic = "Hi"
	apt.FirstName = "Mock"
	apt.LastName = "Data"
	apt.Time = []string{"8.00", "17.00"}

	dailyAppointment = append(dailyAppointment, apt)

	var err error
	return dailyAppointment, err
}
