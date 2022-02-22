package schedule

import (
	"net/http"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
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
	var results []profile.ProviderProfile

	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	results, err = h.service.SearchProvider(req)

	c.JSON(http.StatusOK, results)

}

func (h *Handler) TestHandler(c *gin.Context) {

	var req ScheduleRequest
	var err error
	var working []WorkingDay
	//var results []profile.ProviderProfile

	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	working, err = h.service.GetWorkingDay(req.Month, req.Year)

	c.JSON(http.StatusOK, working)

}
