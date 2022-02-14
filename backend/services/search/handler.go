package search

import (
	"net/http"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
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

func (h *Handler) SearchHandler(c *gin.Context) {

	var req SearchRequest
	var err error
	var results []profile.ProviderProfile

	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	results, err = h.service.SearchProvider(req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "response failed",
		})
		return
	}

	c.JSON(http.StatusOK, results)

}
