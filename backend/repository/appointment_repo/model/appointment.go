package model

type Appointment struct {
	AppointmentId string   `json:"appointmentId"`
	FortuneType   string   `json:"fortuneType"`
	TotalPrice    int      `json:"totalPrice"`
	Time          []string `json:"time"`
	Information   string   `json:"information"`
	Value         string   `json:"value"`
}
