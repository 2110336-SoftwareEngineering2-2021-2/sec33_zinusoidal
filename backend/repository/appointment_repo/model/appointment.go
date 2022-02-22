package model

type Appointment struct {
	FortuneType string   `json:"fortuneType"`
	TotalPrice  string   `json:"totalPrice"`
	Time        []string `json:"time"`
	Information string   `json:"information"`
	Value       string   `json:"value"`
}
