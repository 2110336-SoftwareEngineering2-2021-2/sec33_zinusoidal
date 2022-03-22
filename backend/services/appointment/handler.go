package appointment

import (
	"net/http"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/jwt"
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

func (h *Handler) MakeAppointmentHandler(c *gin.Context) {
	claim, err := jwt.VerifyToken(c)
	customerId := claim.UserID
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"log": err.Error(),
		})
		return
	}
	if customerId[0] != byte('C') {
		c.JSON(http.StatusUnauthorized, gin.H{
			"log": "must to customer token",
		})
		return
	}

	req := AppointmentRequest{}
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}

	if err = h.service.MakeAppointment(customerId, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"log": "ok",
	})
}

func (h *Handler) ResponseAppointmentHandler(c *gin.Context) {
	claim, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"log": err.Error(),
		})
		return
	}
	providerId := claim.UserID

	appointmentId := c.Param("app_id")
	status := c.Param("is_accept")
	if len(status) != 1 {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid status should be between 0 and 3",
		})
		return
	}
	status_val := int([]byte(status)[0] - '0')
	if status_val < 0 || status_val > 3 {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid status should be between 0 and 3",
		})
		return
	}

	if err = h.service.ResponseAppointment(providerId, appointmentId, status_val); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"log": "ok",
	})
}
