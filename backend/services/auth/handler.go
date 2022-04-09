package auth

import (
	"net/http"
	"time"

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

// CustomerRegisterHandler customer register
// @Summary customer registeration and send confirmation email
// @Description See body for request details. Return message if registration is success. Also send the confirmation email
// @Param CustomerRegisterReq formData CustomerRegisterRequest true "Data for creating customer account"
// @Param profilePic formData file false "profile pic file"
// @ID CustomerRegisterHandler
// @Tags auth
// @Accept  json
// @Produce  json
// @Success 200 {object} string "OK"
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "registration is not successful"
// @Router /api/fortune168/v1/customer_register [post]
func (h *Handler) CustomerRegisterHandler(c *gin.Context) {
	var req CustomerRegisterRequest
	var err error
	if err = c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid request",
		})
		return
	}
	if err = h.service.CustomerRegister(req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"log": "OK",
	})
}

// ProviderRegisterHandler provider register
// @Summary provider registeration and send confirmation email
// @Description See body for request details. Return message if registration is success and send confirmation email
// @Param ProviderRegisterReq formData ProviderRegisterRequest true "Data for creating provider account"
// @Param profilePic formData file false "profile pic file"
// @ID ProviderRegisterHandler
// @Tags auth
// @Accept  json
// @Produce  json
// @Success 200 {object} string "OK"
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "registration is not successful"
// @Router /api/fortune168/v1/provider_register [post]
func (h *Handler) ProviderRegisterHandler(c *gin.Context) {
	var req ProviderRegisterRequest
	var err error
	if err = c.ShouldBind(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}

	if err = h.service.ProviderRegister(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"log": "OK",
	})
}

// LoginHandler login handler
// @Summary login by unsername and password
// @Description login by username and password, return jwt token
// @Tags auth
// @Param LoginReq body LoginRequest true "username and password for login"
// @ID LoginHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} LoginResponse
// @Failure 400 {object} string "invalid request"
// @Failure 500 {object} string "error message"
// @Router /api/fortune168/v1/login [post]
func (h *Handler) LoginHandler(c *gin.Context) {
	var req LoginRequest
	var err error
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid request",
		})
		return
	}
	resp, err := h.service.Login(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}
	token, err := jwt.CreateToken(resp.UserId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, LoginResponse{
		Token:        token,
		UserId:       resp.UserId,
		Username:     resp.Username,
		FirstName:    resp.FirstName,
		LastName:     resp.LastName,
		ProfileImage: resp.ProfileImage,
	})

}

// ActivateEmailHandler active(confirm) email
// @Summary use the key in the confirmation email to activate
// @Description send the key from confirmation email to activate
// @Tags auth
// @Param key path string true "uuid values"
// @ID ActivateEmailHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} string "email confirmed"
// @Failure 400 {object} string "invalid key"
// @Failure 500 {object} string "error message"
// @Router /api/fortune168/v1/confirm_email/{key} [post]
func (h *Handler) ActivateEmailHandler(c *gin.Context) {
	key := c.Param("key")
	if key == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid key",
		})
		return
	}
	err := h.service.ConfirmEmail(key)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"log": "email confirmed",
	})
}

func (h *Handler) TestHandler(c *gin.Context) {
	layout := "2006-01-02"
	t, err := time.Parse(layout, "2014-05-22")

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"log": t,
	})

}

// DeleteAccountHandler delete account
// @Summary Delete account for both customer and provider
// @Description just send the request to delete account. Note that this is a hard delete, no way to recover account later.
// @Tags auth
// @Param Authorization header string true "Send token if log-in, to check authority to send message" default(Bearer <Add access token here>)
// @ID DeleteAccountHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} string "ok"
// @Failure 400 {object} string "invalid jwt token"
// @Failure 500 {object} string "error message"
// @Router /api/fortune168/v1/delete_account [post]
func (h *Handler) DeleteAccountHandler(c *gin.Context) {
	claim, err := jwt.VerifyToken(c)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}

	userId := claim.UserID

	err = h.service.DeleteAccount(userId)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"log": "OK",
		})
		return
	}

}
