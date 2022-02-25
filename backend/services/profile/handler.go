package profile

import (
	"errors"
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

func (h *Handler) GetProviderProfileHandler(c *gin.Context) {

	user_id := c.Param("id")
	response, err := h.service.GetProviderProfile(user_id)

	if err != nil {
		if err.Error() == errors.New("Provider not found").Error() {
			c.JSON(http.StatusNotFound, &Logger{
				Log: "Provider not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, &Logger{
			Log: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, response)
}

func (h *Handler) GetCustomerProfileHandler(c *gin.Context) {

	user_id := c.Param("id")
	response, err := h.service.GetCustomerProfile(user_id)

	if err != nil {
		if err.Error() == errors.New("Customer not found").Error() {
			c.JSON(http.StatusNotFound, &Logger{
				Log: "Customer not found",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, &Logger{
			Log: err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, response)
}

func (h *Handler) EditProviderHandler(c *gin.Context) {
	var err error
	token, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, &Logger{
			Log: "invalid jwt token",
		})
		return
	}
	user_id := token.UserID
	var req ProviderEditRequest
	if err = c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, &Logger{
			Log: "invalid request",
		})
		return
	}
	provider, err := h.service.ProviderEdit(req, user_id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, &Logger{
			Log: err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, provider)

}

func (h *Handler) EditPasswordHandler(c *gin.Context) {
	var err error
	token, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, &Logger{
			Log: "invalid jwt token",
		})
		return
	}
	user_id := token.UserID
	var req PasswordEditRequest

	if err = c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, &Logger{
			Log: "invalid request",
		})
		return
	}

	err = h.service.PasswordEdit(req, user_id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, &Logger{
			Log: err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, &Logger{
		Log: "Password Updated",
	})

}
