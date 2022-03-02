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
