package main

import (
	"log"
	"time"

	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/jwt"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/profile_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/auth"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/search"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/spf13/viper"
)

func init() {

	viper.AddConfigPath("configs")
	viper.SetConfigName("config")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("[ERROR] Cannot read in viper config: %s", err)
	}

}

func main() {

	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	router.Use(cors.New(config))

	/* Router */
	db := NewSQLConn() /// connect database
	jwt.Init()         /// init jwt

	auth_handler := auth.NewHandler(*auth.NewService(auth_repo.New(db)))
	v1fortune := router.Group("api/fortune168/v1")
	{
		v1fortune.POST("/customer_register", auth_handler.CustomerRegisterHandler)
		v1fortune.POST("/provider_register", auth_handler.ProviderRegisterHandler)
		v1fortune.POST("/login", auth_handler.LoginHandler)
		v1fortune.POST("/activate/:key", auth_handler.ActivateEmailHandler)

		v1fortune.POST("/test_token", auth_handler.TestHandler)
	}

	search_handler := search.NewHandler(*search.NewService(*auth_repo.New(db)))
	{
		v1fortune.POST("/search", search_handler.SearchHandler)
	}

	profile_handler := profile.NewHandler(*profile.NewService(profile_repo.New(db)))
	{
		v1fortune.GET("/customer/:id", profile_handler.GetCustomerProfileHandler)
		v1fortune.GET("/provider/:id", profile_handler.GetProviderProfileHandler)
		v1fortune.PATCH("/provider/:id", profile_handler.EditProviderHandler)
	}

	router.Run(":" + viper.GetString("app.port"))
}

func NewSQLConn() *gorm.DB {

	/**
	* Dummy
	* TODO:  Add these config to config.yaml and call via viper
	 */
	conf := mysql.Config{
		DBName: viper.GetString("dbname"),
		User:   "fortune_user",
		Passwd: "123456",
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		Loc:    time.Local,
	}

	conn, err := gorm.Open("mysql", conf.FormatDSN())

	if err != nil {
		log.Fatalln("connection error")
	}

	return conn

}
