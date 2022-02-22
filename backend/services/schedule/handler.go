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

	//work, workErr := h.service.GetWorkingDay(req.Month, req.Year)
	var availDate []WorkingDay

	var mock WorkingDay
	mock.Date = 20

	var mockTime [][]string
	mockTime = append(mockTime, []string{"8.00", "19.00"})

	mock.TimeList = mockTime
	availDate = append(availDate, mock)

	var mock2 WorkingDay
	mock2.Date = 11

	var mockTime2 [][]string
	mockTime2 = append(mockTime2, []string{"18.00", "21.00"})
	mockTime2 = append(mockTime2, []string{"04.00", "10.00"})

	mock2.TimeList = mockTime2
	availDate = append(availDate, mock2)

	results.AvailDate = availDate
	results.NotAvailDate = append(results.NotAvailDate, 12)
	results.NotAvailDate = append(results.NotAvailDate, 15)
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

	c.JSON(http.StatusOK, results)

}

func (h *Handler) TestHandler(c *gin.Context) {

	var req ScheduleRequest
	var err error
	var working []WorkingDay

	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	working, err = h.service.GetWorkingDay(req.Month, req.Year)

	c.JSON(http.StatusOK, working)

}
