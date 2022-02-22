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
