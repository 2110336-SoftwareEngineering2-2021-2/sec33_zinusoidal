package chat

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

func (h *Handler) SendMessageHandler(c *gin.Context) {
	token, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}
	req := SendMessageRequest{}
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}
	err = h.service.SendMessage(token.UserID, req.ReceiverId, req.Message)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"log": "ok",
	})
}
func (h *Handler) BlockHandler(c *gin.Context) {

	var req BlockRequest
	var err error
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	token, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid jwt token",
		})
		return
	}

	user_id := token.UserID

	err = h.service.Block(user_id, req.BlockedUserId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error blocking",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})

}

func (h *Handler) UnBlockHandler(c *gin.Context) {

	var req BlockRequest
	var err error
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	token, err := jwt.VerifyToken(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid jwt token",
		})
		return
	}

	user_id := token.UserID

	err = h.service.Unblock(user_id, req.BlockedUserId)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "error unblocking",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "OK",
	})

}
