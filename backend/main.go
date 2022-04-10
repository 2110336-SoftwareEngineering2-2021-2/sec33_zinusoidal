package main

import (
	"context"
	"log"
	"time"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/docs"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/jwt"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/appointment_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/chat_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/profile_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/review_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/schedule_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/appointment"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/auth"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/chat"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/profile"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/review"
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
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
	"github.com/swaggo/gin-swagger/swaggerFiles"
	"google.golang.org/api/option"
)

func init() {

	viper.AddConfigPath("configs")
	viper.SetConfigName("config")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("[ERROR] Cannot read in viper config: %s", err)
	}

}

// @title           Swagger Example API
// @version         2.0
// @description     This is a sample server celler server.
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      zinusoidal-fortune.kirkpig.dev
// @BasePath  /

// @securityDefinitions.basic BasicAuth

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

// @securitydefinitions.oauth2.application OAuth2Application
// @tokenUrl https://example.com/oauth/token
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.implicit OAuth2Implicit
// @authorizationurl https://example.com/oauth/authorize
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.password OAuth2Password
// @tokenUrl https://example.com/oauth/token
// @scope.read Grants read access
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.accessCode OAuth2AccessCode
// @tokenUrl https://example.com/oauth/token
// @authorizationurl https://example.com/oauth/authorize
// @scope.admin Grants read and write access to administrative information
func main() {

	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOriginFunc = func(origin string) bool { return true }
	config.AllowOrigins = []string{"*"}
	//config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With"}
	//config.AllowHeaders = []string{"*"}

	/// make this runable in local

	router.Use(cors.New(config))
	// init swagger
	docs.SwaggerInfo.BasePath = "/"
	router.GET("api/fortune168/v1/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	/* Router */
	db := NewSQLConn() /// connect database
	jwt.Init()         /// init jwt
	client := NewFirestoreConn()

	sess := ConnectAws()

	auth_handler := auth.NewHandler(*auth.NewService(auth_repo.New(db), *services.NewService(sess), profile_repo.New(db)))
	v1fortune := router.Group("api/fortune168/v1")
	{
		v1fortune.POST("/customer_register", auth_handler.CustomerRegisterHandler)
		v1fortune.POST("/provider_register", auth_handler.ProviderRegisterHandler)
		v1fortune.POST("/login", auth_handler.LoginHandler)
		v1fortune.POST("/confirm_email/:key", auth_handler.ActivateEmailHandler)
		v1fortune.POST("/delete_account", auth_handler.DeleteAccountHandler)
	}
	v1fortune.GET("/test", auth_handler.TestHandler)

	search_handler := search.NewHandler(*search.NewService(profile_repo.New(db), *profile.NewService(profile_repo.New(db),
		*services.NewService(sess), *auth.NewService(auth_repo.New(db), *services.NewService(sess), profile_repo.New(db)))))
	{
		v1fortune.POST("/search", search_handler.SearchHandler)
		v1fortune.GET("/all_services", search_handler.GetAllServicesHandler)
		v1fortune.GET("/landing_page_info", search_handler.GetLandingPageInfoHandler)
	}

	profile_handler := profile.NewHandler(*profile.NewService(profile_repo.New(db), *services.NewService(sess), *auth.NewService(auth_repo.New(db), *services.NewService(sess), profile_repo.New(db))))
	{
		v1fortune.GET("/customer/:id", profile_handler.GetCustomerProfileHandler)
		v1fortune.GET("/provider/:id", profile_handler.GetProviderProfileHandler)
		v1fortune.PATCH("/provider_edit", profile_handler.EditProviderHandler)
		v1fortune.PATCH("/password_edit", profile_handler.EditPasswordHandler)
	}
	schedule_handler := schedule.NewHandler(*schedule.NewService(schedule_repo.New(db), *profile.NewService(profile_repo.New(db), *services.NewService(sess), *auth.NewService(auth_repo.New(db), *services.NewService(sess), profile_repo.New(db)))))
	{
		v1fortune.POST("/my_schedule/:id", schedule_handler.MyScheduleHandler)
		v1fortune.POST("/available_schedule/:id", schedule_handler.ScheduleHandler)
		v1fortune.POST("/available_time/:id", schedule_handler.FreeTimeHandler)
	}

	appointment_handler := appointment.NewHandler(*appointment.NewService(appointment_repo.New(db, client)))
	{
		v1fortune.POST("/make_appointment", appointment_handler.MakeAppointmentHandler)
		v1fortune.POST("/response_appointment/:app_id/:status", appointment_handler.ResponseAppointmentHandler)
	}

	chat_handler := chat.NewHandler(*chat.NewService(chat_repo.New(db, client)))
	{
		v1fortune.POST("/send_message", chat_handler.SendMessageHandler)
		v1fortune.POST("/block", chat_handler.BlockHandler)
		v1fortune.POST("/unblock", chat_handler.UnBlockHandler)
	}

	review_handler := review.NewHandler(*review.NewService(review_repo.New(db)))
	{
		v1fortune.POST("/review", review_handler.ReviewRatingHandler)
		v1fortune.GET("/review/:user_id", review_handler.GetReviewHandler)
	}

	router.Run(":" + viper.GetString("app.port"))
}

func NewFirestoreConn() *firestore.Client {
	ctx := context.Background()

	opt := option.WithCredentialsFile("/etc/zinusoidal/secret/secret_key.json")

	app, err := firebase.NewApp(ctx, nil, opt)

	if err != nil {
		log.Println(err)
		return nil
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Println(err)
		return nil
	}
	log.Println("firestore connected!! 🎉")
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
