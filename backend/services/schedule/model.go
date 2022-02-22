package schedule

type ScheduleRequest struct {
	Month int `json:"month"`
	Year  int `json:"year"`
}

type WorkingDay struct {
	Date     int
	TimeList [][]string
}

type ScheduleDto struct {
	AvailDate    []WorkingDay `json:"available_date"`
	NotAvailDate []int        `json:"not_available_date"`
}

type Appointment struct {
	Topic     string
	FirstName string
	LastName  string
	Time      []string
}

type MyScheduleRequest struct {
	Date  int `json:"date" binding:"required"`
	Month int `json:"month" binding:"required"`
	Year  int `json:"year" binding:"required"`
}

type Logger struct {
	Log string `json:"log"`
}
