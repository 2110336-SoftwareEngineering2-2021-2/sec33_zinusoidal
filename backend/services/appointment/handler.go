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
	is_accept := false
	if status != "0" && status != "1" {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "accept status must be 0 or 1",
		})
		return
	}
	if status == "1" {
		is_accept = true
	}
	if err = h.service.ResponseAppointment(providerId, appointmentId, is_accept); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"log": "ok",
	})
}
