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

// SendMessageHandler send message endpoint
// @Summary send message to other users
// @Description if message is not null, the endpoint will send message, otherwise create new chatroom(if not exist)
// @Tags chat
// @Param SendMessageReq body SendMessageRequest true "Data for creating customer account"
// @Param Authorization header string false "Send token if log-in, to check authority to send message" default(Bearer <Add access token here>)
// @ID SendMessageHandler
// @Accept  json
// @Produce  json
// @Success 200 {object} string "ok"
// @Failure 500 {object} string "error message"
// @Router /api/fortune168/v1/send_message [post]
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
