package profile

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

func (h *Handler) GetProviderProfileHandler(c *gin.Context) {

	user_id := c.Param("id")
	response, err := h.service.getProviderProfile(user_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, &Logger{
			Log: "Response failed",
		})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (h *Handler) GetCustomerProfileHandler(c *gin.Context) {

	user_id := c.Param("id")
	response, err := h.service.getCustomerProfile(user_id)

	if err != nil {
		c.JSON(http.StatusBadRequest, &Logger{
			Log: "Response failed",
		})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (h *Handler) EditProviderHandler(c *gin.Context) {

	return
}
