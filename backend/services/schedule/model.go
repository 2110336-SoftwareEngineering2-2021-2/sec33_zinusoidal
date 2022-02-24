package schedule

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
	StartTime   string `gorm:"column:start_time"`
	FinishTime  string `gorm:"column:finish_time"`
	CustomerId  string `gorm:"column:customer_id"`
	FortuneType string `gorm:"column:fortune_type"`
}

type ScheduleDB struct {
	WorkSchedule string `gorm:"column:work_schedule"`
}

type Logger struct {
	Log string `json:"log"`
}
