package review_repo

type ReviewItem struct {
	Name       string `json:"name" gorm:"column:first_name"`
	ProfilePic string `json:"profilePic" gorm:"column:profile_image"`
	Score      int    `json:"score" gorm:"column:score"`
	Text       string `json:"text" gorm:"column:comment"`
}
