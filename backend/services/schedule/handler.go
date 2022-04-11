package schedule

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

// ScheduleHandler Get schedule in month
// @Summary Get schedule in calendar's month format
// @Description See body for request details and uuid in param. Return calendar in format if success
// @Param ScheduleRequest body ScheduleRequest true "time to get schedule"
// @Param id path string true "uuid values"
// @ID ScheduleHandler
// @Tags schedule
// @Accept  json
// @Produce  json
// @Success 200 {object} ScheduleDto
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "error logs"
// @Router /api/fortune168/v1/available_schedule/{id} [post]
func (h *Handler) ScheduleHandler(c *gin.Context) {

	var req ScheduleRequest
	var err error
	var results ScheduleDto

	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}
	user_id := c.Param("id")

	work, workErr := h.service.GetWorkingDay(req.Month, req.Year, user_id)

	if workErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": workErr.Error(),
		})
		return
	}

	results, err = h.service.RemoveBooked(work, user_id, req.Month, req.Year)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, results)

}

// MyScheduleHandler Get schedule in day
// @Summary Get schedule in calendar's day format
// @Description See body for request details and uuid in param. Return calendar in day format if success
// @Param MyScheduleRequest body MyScheduleRequest true "time to get schedule"
// @Param id path string true "uuid values"
// @ID MyScheduleHandler
// @Tags schedule
// @Accept  json
// @Produce  json
// @Success 200 {array} Appointment
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "error logs"
// @Router /api/fortune168/v1/my_schedule/{id} [post]
func (h *Handler) MyScheduleHandler(c *gin.Context) {

	var req MyScheduleRequest
	var err error
	var results []Appointment

	user_id := c.Param("id")

	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	results, err = h.service.GetApt(req.Date, req.Month, req.Year, user_id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, results)

}

// FreeTimeHandler Get free time of this provider
// @Summary Get free time of this provider
// @Description See body for request details and uuid in param. Return freetime in day format if success
// @Param MyScheduleRequest body MyScheduleRequest true "time to get schedule"
// @Param id path string true "uuid values"
// @ID FreeTimeHandler
// @Tags schedule
// @Accept  json
// @Produce  json
// @Success 200 {array} string "free time"
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "error logs"
// @Router /api/fortune168/v1/available_time/{id} [post]
func (h *Handler) FreeTimeHandler(c *gin.Context) {

	var req MyScheduleRequest
	var err error
	var results [][]string

	user_id := c.Param("id")

	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	results, err = h.service.GetFreeTime(req.Date, req.Month, req.Year, user_id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, results)

}
