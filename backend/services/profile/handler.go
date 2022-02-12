package profile

import (
	"errors"
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
		if err.Error() == errors.New("Provider not found").Error() {
			c.JSON(http.StatusNotFound, &Logger{
				Log: "Provider not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, &Logger{
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
		if err.Error() == errors.New("Customer not found").Error() {
			c.JSON(http.StatusNotFound, &Logger{
				Log: "Customer not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, &Logger{
			Log: "Response failed",
		})
		return
	}
	c.JSON(http.StatusOK, response)
}

func (h *Handler) EditProviderHandler(c *gin.Context) {

	user_id := c.Param("id")
	var req ProviderEditRequest
	var err error
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid request",
		})
		return
	}
	provider, err := h.service.ProviderEdit(req, user_id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, &Logger{
			Log: "Response failed",
		})
		return
	}
	c.JSON(http.StatusOK, provider)

}
