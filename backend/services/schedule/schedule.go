package schedule

import (
	"strconv"
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
	GetProviderSchedule(string) ([]model.WorkSchedule, error)
}

type Servicer interface {
}

func NewService(database Databaser, p profile.Service) *Service {
	return &Service{
		database:       database,
		profileService: p,
	}
}

//get results an array of working day
func (s *Service) GetWorkingDay(month, year int, userId string) ([]WorkingDay, error) {
	firstOfMonth := time.Date(year, time.Month(month), 1, 1, 10, 30, 0, time.UTC)
	lastOfMonth := firstOfMonth.AddDate(0, 1, -1)
	dailySchedule, schErr := s.database.GetProviderSchedule(userId)

	if schErr != nil {
		return []WorkingDay{}, schErr
	}
	t := firstOfMonth
	//t = 1 jan

	var results []WorkingDay

	//loop each day in month
	for i := 0; i < lastOfMonth.Day(); i++ {

		check := t.AddDate(0, 0, i)

		var currentDay string
		currentDay = check.Weekday().String()
		//mon, tue, wed...

		for _, day := range dailySchedule {
			//check if timeList not empty
			if day.Day == currentDay && len(day.TimeList) > 0 {
				var work WorkingDay

				_, _, d := check.Date()
				work.Date = d
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

	//w = [ { date : 10 , timeList : [ [08.00-10.00] , [12.00-16.00] ]  }  ]

	var availDate []WorkingDay
	var notAvail []int

	//final response
	var avail []WorkingDay

	var appointment []AppointmentDB

	appointment, _ = s.database.GetProviderAppointment(userId)

	//for each apt, remove avail time
	for _, appoint := range appointment {

		sStart, _ := StringToDateTime(appoint.StartTime)

		y, m, day := sStart.Date()

		appointStart, _ := StringToDateTime(appoint.StartTime)
		appointEnd, _ := StringToDateTime(appoint.FinishTime)

		for _, workDay := range w {

			if workDay.Date == day {

				//this day = new workDay
				thisDay := workDay
				thisDay.Date = workDay.Date

				for _, t := range workDay.TimeList {
					startHr, _ := strconv.Atoi(t[0][0:2])
					startMin, _ := strconv.Atoi(t[0][2:4])
					endHr, _ := strconv.Atoi(t[1][0:2])
					endMin, _ := strconv.Atoi(t[1][2:4])

					//working time peiod from timeList
					startTime := time.Date(y, m, day, startHr, startMin, 0, 0, time.UTC)
					endTime := time.Date(y, m, day, endHr, endMin, 0, 0, time.UTC)

					var newTimeList [][]string

					//check if appointment is not in this period
					haventStarted := endTime.Before(appointStart) || (endTime == appointStart)
					later := appointEnd.Before(startTime) || appointEnd == startTime

					if !haventStarted && !later {

						var newTime []string

						b1 := startTime
						b2 := appointStart
						b3 := appointEnd
						b4 := endTime

						if b1 == b2 && b3 != b4 {
							newTime, _ = MakeTimeInterval(b3, b4)
							newTimeList = append(newTimeList, newTime)
						} else if b1 != b2 && b3 == b4 {
							newTime, _ = MakeTimeInterval(b1, b2)
							newTimeList = append(newTimeList, newTime)
						} else if b1 != b2 && b3 != b4 {
							newTime, _ = MakeTimeInterval(b1, b2)
							newTimeList = append(newTimeList, newTime)

							newTime2, _ := MakeTimeInterval(b3, b4)
							newTimeList = append(newTimeList, newTime2)
						}

					} else {
						newTimeList = append(newTimeList, t)
					}
					thisDay.TimeList = newTimeList
				}
				availDate = append(availDate, thisDay)
			} else {
				availDate = append(availDate, workDay)
			}
		}

		for _, d := range availDate {
			if len(d.TimeList) == 0 {
				notAvail = append(notAvail, d.Date)
			} else {
				avail = append(avail, d)
			}
		}
	}

	var err error

	var ret ScheduleDto

	ret.AvailDate = avail
	ret.NotAvailDate = notAvail

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
		sStart, _ := StringToDateTime(apt.StartTime)
		sEnd, _ := StringToDateTime(apt.FinishTime)

		yr, m, d := sStart.Date()
		if yr == year && m == time.Month(month) && d == date {

			var customer profile.CustomerProfile
			customer, err = s.profileService.GetCustomerProfile(apt.CustomerId)

			var aptDto Appointment

			aptDto.FirstName = customer.FirstName
			aptDto.LastName = customer.LastName
			aptDto.Topic = apt.FortuneType

			time, _ := MakeTimeInterval(sStart, sEnd)
			aptDto.Time = time

			dailyAppointment = append(dailyAppointment, aptDto)
		}
	}

	return dailyAppointment, nil
}

func MakeTimeInterval(startTime, endTime time.Time) ([]string, error) {

	layoutTime := "15:04:05"
	strStart := startTime.Format(layoutTime)
	strStart = strStart[0 : len(strStart)-3]

	strEnd := endTime.Format(layoutTime)
	strEnd = strEnd[0 : len(strEnd)-3]

	var interval []string
	interval = append(interval, strStart)
	interval = append(interval, strEnd)

	return interval, nil
}

func StringToDateTime(s string) (time.Time, error) {

	yr, _ := strconv.Atoi(s[0:4])
	m, _ := strconv.Atoi(s[5:7])
	d, _ := strconv.Atoi(s[8:10])
	hr, _ := strconv.Atoi(s[11:13])
	min, _ := strconv.Atoi(s[14:16])

	startTime := time.Date(yr, time.Month(m), d, hr, min, 0, 0, time.UTC)

	return startTime, nil
}
