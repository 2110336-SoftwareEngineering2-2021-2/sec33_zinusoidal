package main

import (
	"context"
	"log"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/jwt"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/profile_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/schedule_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/appointment"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/auth"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/schedule"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/search"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
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
	config.AllowOriginFunc = func(origin string) bool { return true }
	config.AllowOrigins = []string{"*"}
	//config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With"}
	//config.AllowHeaders = []string{"*"}

	router.Use(cors.New(config))

	/* Router */
	db := NewSQLConn() /// connect database
	jwt.Init()         /// init jwt
	//client := NewFirestoreConn()

	sess := ConnectAws()

	auth_handler := auth.NewHandler(*auth.NewService(auth_repo.New(db), *services.NewService(sess)))
	v1fortune := router.Group("api/fortune168/v1")
	{
		v1fortune.POST("/customer_register", auth_handler.CustomerRegisterHandler)
		v1fortune.POST("/provider_register", auth_handler.ProviderRegisterHandler)
		v1fortune.POST("/login", auth_handler.LoginHandler)
		v1fortune.POST("/confirm_email/:key", auth_handler.ActivateEmailHandler)
	}
	v1fortune.POST("/test", auth_handler.TestHandler)

	search_handler := search.NewHandler(*search.NewService(profile_repo.New(db), *profile.NewService(profile_repo.New(db), *services.NewService(sess), *auth.NewService(auth_repo.New(db), *services.NewService(sess)))))
	{
		v1fortune.POST("/search", search_handler.SearchHandler)
		v1fortune.GET("/all_services", search_handler.GetAllServicesHandler)
		v1fortune.GET("/landing_page_info", search_handler.GetLandingPageInfoHandler)
	}

	profile_handler := profile.NewHandler(*profile.NewService(profile_repo.New(db), *services.NewService(sess), *auth.NewService(auth_repo.New(db), *services.NewService(sess))))
	{
		v1fortune.GET("/customer/:id", profile_handler.GetCustomerProfileHandler)
		v1fortune.GET("/provider/:id", profile_handler.GetProviderProfileHandler)
		v1fortune.PATCH("/provider_edit", profile_handler.EditProviderHandler)
		v1fortune.PATCH("/password_edit", profile_handler.EditPasswordHandler)
	}
	schedule_handler := schedule.NewHandler(*schedule.NewService(schedule_repo.New(db), *profile.NewService(profile_repo.New(db), *services.NewService(sess), *auth.NewService(auth_repo.New(db), *services.NewService(sess)))))
	{
		v1fortune.POST("/my_schedule/:id", schedule_handler.MyScheduleHandler)
		v1fortune.POST("/available_schedule/:id", schedule_handler.ScheduleHandler)
	}

	appointment_handler := appointment.NewHandler(*appointment.NewService(appointment_repo.New(db, nil)))
	{
		v1fortune.POST("/make_appointment", appointment_handler.MakeAppointmentHandler)
		v1fortune.POST("/response_appointment/:app_id/:is_accept", appointment_handler.ResponseAppointmentHandler)
	}

	router.Run(":" + viper.GetString("app.port"))
}

func NewFirestoreConn() *firestore.Client {
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: ""}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err.Error())
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	return client
}

func NewSQLConn() *gorm.DB {

	conf := mysql.Config{
		DBName: viper.GetString("mysql.db_name"),
		User:   viper.GetString("mysql.username"),
		Passwd: viper.GetString("mysql.password"),
		Net:    viper.GetString("mysql.net"),
		Addr:   viper.GetString("mysql.host") + ":" + viper.GetString("mysql.port"),
		Loc:    time.Local,
	}

	conn, err := gorm.Open("mysql", conf.FormatDSN())

	if err != nil {
		log.Println("connection error")
		log.Fatalln(err.Error())
	}

	log.Println("db connected!! 🎉")

	return conn

}

func ConnectAws() *session.Session {
	var AccessKeyID = viper.GetString("bucket.access")
	var SecretAccessKey = viper.GetString("bucket.secret")
	var MyRegion = viper.GetString("bucket.zone")
	sess, err := session.NewSession(
		&aws.Config{
			Region: aws.String(MyRegion),
			Credentials: credentials.NewStaticCredentials(
				AccessKeyID,
				SecretAccessKey,
				"", // a token will be created when the session it's used.
			),
		})
	if err != nil {
		panic(err)
	}
	return sess
}
