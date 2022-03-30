package review

type ReviewRatingRequest struct {
	AppointmentId string `json:"appointmentId"`
	Score         int    `json:"score"`
	Text          string `json:"text"`
}
