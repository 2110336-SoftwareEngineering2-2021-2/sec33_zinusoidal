package jwt

import (
	"fmt"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type JwtClaims struct {
	UserID string `json:"userId"`
	jwt.StandardClaims
}

func VerifyToken(c *gin.Context) (*jwt.Token, error) {
	token := ExtractToken(c)
	jwtToken, err := jwt.ParseWithClaims(
		token,
		&JwtClaims{},
		func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
			}
			return []byte("secret"), nil
		},
	)
	if err != nil {
		return nil, err
	}
	return jwtToken, nil
}

func ExtractToken(c *gin.Context) string {
	token := c.Request.Header.Get("Authorization")
	splitToken := strings.Split(token, "Bearer ")
	if len(splitToken) == 2 {
		return splitToken[1]
	}
	return ""
}
