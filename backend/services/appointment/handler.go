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

// MakeAppointmentHandler make appointment
// @Summary Customer make appointment with provider
// @Description customer provider information about service they want and make request to provider
// @Tags appointment
// @Param AppointmentReq body AppointmentRequest true "Detail of services"
// @Param Authorization header string false "Send token if log-in, to check authority to send message, also this must be customer token" default(Bearer <Add access token here>)
// @ID MakeAppointmentHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} string "ok"
// @Failure 400 {object} string "invalid request or invalid jwt(must be customer)"
// @Failure 500 {object} string "error message"
// @Router /api/fortune168/v1/make_appointment [post]
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

// ResponseAppointmentHandler response to appointment, in general change status of request
// @Summary change status of request
// @Description provider can accept and reject the request. The status can be complete after the service and reviewed if customer submit review
// @Tags appointment
// @Param app_id path string true "appointment_id"
// @Param status path string true "status to be changed"
// @Param Authorization header string false "Send token if log-in, to check authority to send message, also this must be customer token" default(Bearer <Add access token here>)
// @ID ResponseAppointmentHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} string "ok"
// @Failure 400 {object} string "invalid request or invalid jwt"
// @Failure 500 {object} string "error message"
// @Router /api/fortune168/v1/response_appointment/{app_id}/{status} [post]
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
	status := c.Param("status")
	if len(status) != 1 {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid status. status should be between 1 and 4",
		})
		return
	}
	status_val := int([]byte(status)[0]) - int('0')
	if status_val <= 0 || status_val > 5 {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid status. status should be between 1 and 4",
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
