package jwt

import (
	"errors"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type JwtClaims struct {
	UserID string `json:"userId"`
	jwt.StandardClaims
}

var JWTSignedKey string

func Init() {
	JWTSignedKey = os.Getenv("JWT_SIGNED_KEY")
}

func VerifyToken(c *gin.Context) (*JwtClaims, error) {
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
	var claims *JwtClaims
	claims, ok := jwtToken.Claims.(*JwtClaims)
	if !ok {
		return nil, errors.New("jwt token error")
	}
	return claims, nil
}

func ExtractToken(c *gin.Context) string {
	token := c.Request.Header.Get("Authorization")
	splitToken := strings.Split(token, "Bearer ")
	if len(splitToken) == 2 {
		return splitToken[1]
	}
	return ""
}

func CreateToken(userID string) (string, error) {

	x := JwtClaims{
		UserID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 2400).Unix(),
		},
	}

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, x)

	access_token, err := at.SignedString([]byte(JWTSignedKey))
	if err != nil {
		return "", err
	}

	return access_token, nil
}
