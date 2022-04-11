package review

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandler(s Service) *Handler {
	return &Handler{
		service: s,
	}
}

// GetReviewHandler Get review
// @Summary Get Provider review
// @Description Enter provider's provider in param. Return all review of this provider
// @Param user_id path string true "uuid values"
// @ID GetReviewHandler
// @Tags review
// @Accept  json
// @Produce  json
// @Success 200 {object} ProviderReview
// @Failure 400 {object} string "invalid request"
// @Router /api/fortune168/v1/review/{user_id} [get]
func (h *Handler) GetReviewHandler(c *gin.Context) {

	user_id := c.Param("user_id")

	res, err := h.service.GetReviewQuery(user_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusAccepted, ProviderReview{
		ReviewList: res,
	})

}

// ReviewRatingHandler Post review
// @Summary Post review for this appointment
// @Description See body for request details. Return message if review is success
// @Param ReviewRatingRequest body ReviewRatingRequest true "review info to be post"
// @ID ReviewRatingHandler
// @Tags review
// @Accept  json
// @Produce  json
// @Success 200 {object} string "OK"
// @Failure 400 {object} string "invalid request"
// @Failure 400 {object} string "error logs"
// @Router /api/fortune168/v1/review [post]
func (h *Handler) ReviewRatingHandler(c *gin.Context) {

	var req ReviewRatingRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	err := h.service.ReviewRating(req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusAccepted, gin.H{
		"message": "OK",
	})

}
