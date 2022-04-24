package test

import (
	"net/http"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/jwt"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB

type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	Token        string `json:"token"`
	UserId       string `json:"user_id"`
	Username     string `json:"username"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	ProfileImage string `json:"profile_image"`
}

func LoginHandler(c *gin.Context) {
	req := LoginRequest{}
	var err error
	if err = c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": "invalid request",
		})
		return
	}
	resp, err := Login(req.Username, req.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"log": err.Error(),
		})
		return
	}
	token, err := jwt.CreateToken(resp.UserId)
	c.JSON(http.StatusOK, LoginResponse{
		Token:        token,
		UserId:       resp.UserId,
		Username:     resp.Username,
		FirstName:    resp.FirstName,
		LastName:     resp.LastName,
		ProfileImage: resp.ProfileImage,
	})
}

func Login(username, password string) (model.LoginQuery, error) {

	login_command := `SELECT U.id, U.username, U.password, C.first_name, C.last_name, C.profile_image 
    FROM fortune_user U RIGHT JOIN customer C ON U.id = C.id
    WHERE U.username = ?
UNION
SELECT U.id, U.username, U.password, P.first_name, P.last_name, P.profile_image 
    FROM fortune_user U RIGHT JOIN provider P ON U.id = P.id
    WHERE U.username = ?;`
	var result model.LoginQuery

	err := db.Raw(login_command, username, username).Scan(&result).Error
	if err != nil {
		return model.LoginQuery{}, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(password))
	if err != nil {
		return model.LoginQuery{}, err
	}

	return result, err
}
