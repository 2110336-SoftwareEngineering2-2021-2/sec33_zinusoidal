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
	c.JSON(http.StatusOK, gin.H{
		"token":         token,
		"user_id":       resp.UserId,
		"username":      resp.Username,
		"first_name":    resp.FirstName,
		"last_name":     resp.LastName,
		"profile_image": resp.ProfileImage,
	})
}

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
	c.JSON(http.StatusOK, gin.H{
		"message": time.Now(),
	})
}
