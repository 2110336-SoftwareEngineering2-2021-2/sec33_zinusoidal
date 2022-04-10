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

// SearchHandler Searching
// @Summary Search for provider by search argument
// @Description See body for request details. Return array of search result if success
// @Param SearchRequest formData SearchRequest true "search argument"
// @ID SearchHandler
// @Tags search
// @Accept  json
// @Produce  json
// @Success 200 {array} profile.ProviderProfile
// @Failure 400 {object} string "invalid request"
// @Router /api/fortune168/v1/search [post]
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

	c.JSON(http.StatusOK, results)

}

// GetAllServicesHandler Get all-services
// @Summary Get all services in platform
// @Description Return array of search result if success
// @ID GetAllServicesHandler
// @Tags search
// @Accept  json
// @Produce  json
// @Success 200 {object} string "services"
// @Failure 400 {object} string "invalid request"
// @Router /api/fortune168/v1/all_services [get]
func (h *Handler) GetAllServicesHandler(c *gin.Context) {
	fortunes, err := h.service.GetAllResult()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"services": fortunes,
	})
}

// GetLandingPageInfoHandler Landing page info
// @Summary Get all info for landing page
// @Description Return all info that in landing page if success
// @ID GetLandingPageInfoHandler
// @Tags search
// @Accept  json
// @Produce  json
// @Success 200 {object} LandingPageInfo
// @Failure 500 {object} string "error log"
// @Router /api/fortune168/v1/landing_page_info [get]
func (h *Handler) GetLandingPageInfoHandler(c *gin.Context) {
	info, err := h.service.GetLandingPageInfo()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"log": err.Error(),
		})
	}
	c.JSON(http.StatusOK, info)
}
