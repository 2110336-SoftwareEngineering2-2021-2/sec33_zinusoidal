package schedule

import "time"

type ScheduleRequest struct {
	Month int `json:"month" binding:"required"`
	Year  int `json:"year" binding:"required"`
}

type WorkingDay struct {
	Date     int        `json:"date"`
	TimeList [][]string `json:"timeList"`
}

type ScheduleDto struct {
	AvailDate    []WorkingDay `json:"available_date"`
	NotAvailDate []int        `json:"not_available_date"`
}

type Appointment struct {
	Topic     string   `json:"topic"`
	FirstName string   `json:"firstName"`
	LastName  string   `json:"lastName"`
	Time      []string `json:"time"`
}

type MyScheduleRequest struct {
	Date  int `json:"date" binding:"required"`
	Month int `json:"month" binding:"required"`
	Year  int `json:"year" binding:"required"`
}

type AppointmentDB struct {
	StartTime  time.Time `gorm:"column:start_time"`
	FinishTime time.Time `gorm:"column:finish_time"`
	CustomerId string    `gorm:"column:customer_id"`
}

type Logger struct {
	Log string `json:"log"`
}
