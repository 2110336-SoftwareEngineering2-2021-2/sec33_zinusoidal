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

// GetProviderProfileHandler get provider profile
// @Summary Get provider profile
// @Description send id to get provider profile
// @Tags profile
// @Param id path string true "provider id"
// @ID GetProviderProfileHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} ProviderProfile
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "error message, ex: provider not found"
// @Router /api/fortune168/v1/provider/{id} [get]
func (h *Handler) GetProviderProfileHandler(c *gin.Context) {

	user_id := c.Param("id")
	response, err := h.service.GetProviderProfile(user_id)

	if err != nil {
		if err.Error() == errors.New("provider not found").Error() {
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

// GetCustomerProfileHandler get customer profile
// @Summary Get customer profile
// @Description send id to get customer profile
// @Tags profile
// @Param id path string true "customer id"
// @ID GetCustomerProfileHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} CustomerProfile
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "error message, ex: customer not found"
// @Router /api/fortune168/v1/customer/{id} [get]
func (h *Handler) GetCustomerProfileHandler(c *gin.Context) {

	user_id := c.Param("id")
	response, err := h.service.GetCustomerProfile(user_id)

	if err != nil {
		if err.Error() == errors.New("customer not found").Error() {
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

// EditProviderHandler edit provider profile
// @Summary edit provider profile
// @Description send jwt token to edit profile of provider
// @Tags profile
// @Param ProviderEditReq formData ProviderEditRequest true "provider profile information to be updated"
// @Param profilePic formData file false "profile pic file"
// @Param Authorization header string true "Send token if log-in, to check authority to edit profile" default(Bearer <Add access token here>)
// @ID EditProviderHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} ProviderProfile
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "error message"
// @Router /api/fortune168/v1/provider_edit [patch]
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

// EditPasswordHandler edit password
// @Summary edit password
// @Description send jwt token to verify, and re-enter password again
// @Tags profile
// @Param PasswordEditReq body PasswordEditRequest true "customer id"
// @Param Authorization header string true "Send token if log-in, to check authority to edit password" default(Bearer <Add access token here>)
// @ID EditPasswordHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} string "Password Updated"
// @Failure 400 {object} string "invalid request or invalid jwt"
// @Failure 500 {object} string "error message, ex: customer not found"
// @Router /api/fortune168/v1/password_edit [patch]
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
