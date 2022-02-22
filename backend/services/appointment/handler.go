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
	customer_id := claim.UserID
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"log": err.Error(),
		})
	}
	req := AppointmentRequest{}
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
	}

	if err = h.service.MakeAppointment(customer_id, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
	}
}
