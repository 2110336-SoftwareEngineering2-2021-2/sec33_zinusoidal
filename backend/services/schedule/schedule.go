package schedule

import (
	"fmt"
	"time"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
)

type Service struct {
	database       Databaser
	profileService profile.Service
}

type Databaser interface {
	GetProviderAppointment(string) ([]AppointmentDB, error)
}

type Servicer interface {
}

func NewService(database Databaser, p profile.Service) *Service {
	return &Service{
		database:       database,
		profileService: p,
	}
}

//get results an array of red n green
func (s *Service) GetWorkingDay(month, year int) ([]WorkingDay, error) {
	firstOfMonth := time.Date(year, time.Month(month), 1, 1, 10, 30, 0, time.UTC)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)

	fmt.Println("FOM", firstOfMonth)
	fmt.Println("LOM", lastOfMonth)

	test, fErr := MakeTimeInterval(time.Now(), time.Now())
	fmt.Println("Test Time", test, "err", fErr)

	weekday := firstOfMonth.Weekday()

	fmt.Println("weekday", weekday)
	//get Daily Schedule
	var dailySchedule []model.WorkSchedule
	t := firstOfMonth
	//t = 1 jan

	var results []WorkingDay

	//loop each day in week
	for i := 0; i < 7; i++ {

		check := t.AddDate(0, 0, i)
		//check ="2jan 3jan .... (1 week) "
		fmt.Println("check", check)

		var currentDay string
		currentDay = check.Weekday().String()
		//get CurrentDay from check

		for _, day := range dailySchedule {
			if day.Day == currentDay {
				fmt.Println("daily day", day)
				var work WorkingDay

				//get Date from 'check'
				_, _, d := check.Date()
				work.Date = d
				work.TimeList = day.TimeList
				// work = ["date": 31, "TimeList" : [[]] } ]
				results = append(results, work)
			}

		}
	}

	fmt.Println("results", results)

	var err error
	return results, err
}

func (s *Service) RemoveBooked(w []WorkingDay, userId string) (ScheduleDto, error) {

	//get appointment of userId []

	//remove not avail
	// for _, appoint := range appointment {
	// 	fmt.Println("Appointment", appoint)
	// 	//for every appointment -> move to not_avail

	// }

	//if avail_time empty -> move to not avail day

	var err error

	var ret ScheduleDto
	return ret, err
}

func (s *Service) GetApt(date, month, year int, userId string) ([]Appointment, error) {

	var dailyAppointment []Appointment

	//appointment of userId []
	allAppointment, err := s.database.GetProviderAppointment(userId)

	if err != nil {
		return dailyAppointment, err
	}

	for _, apt := range allAppointment {
		yr, m, d := apt.StartTime.Date()
		if yr == year && m == time.Month(month) && d == date {

			var customer profile.CustomerProfile
			customer, err = s.profileService.GetCustomerProfile(apt.CustomerId)

			var aptDto Appointment

			aptDto.FirstName = customer.FirstName
			aptDto.LastName = customer.LastName
			//aptDto.Topic = ?

			time, _ := MakeTimeInterval(apt.StartTime, apt.FinishTime)
			aptDto.Time = time

			dailyAppointment = append(dailyAppointment, aptDto)
		}
	}

	return dailyAppointment, err
}

func MakeTimeInterval(startTime, endTime time.Time) ([]string, error) {

	startTime = time.Date(2021, time.Month(2), 21, 1, 10, 30, 0, time.UTC)
	endTime = time.Now()
	layoutTime := "15:04:05"
	strStart := startTime.Format(layoutTime)
	strStart = strStart[0 : len(strStart)-3]

	strEnd := startTime.Format(layoutTime)
	strEnd = strEnd[0 : len(strEnd)-3]

	var interval []string
	interval = append(interval, strStart)
	interval = append(interval, strEnd)

	return interval, nil
}
