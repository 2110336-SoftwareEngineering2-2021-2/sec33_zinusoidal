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
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/chat_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/profile_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/schedule_repo"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/appointment"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/auth"
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/services/chat"
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
	"google.golang.org/api/option"
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
	v1fortune.POST("/test", auth_handler.TestHandler)

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
		v1fortune.POST("/response_appointment/:app_id/:is_accept", appointment_handler.ResponseAppointmentHandler)
	}

	chat_handler := chat.NewHandler(*chat.NewService(chat_repo.New(db, client)))
	{
		v1fortune.POST("/send_message", chat_handler.SendMessageHandler)
	}

	router.Run(":" + viper.GetString("app.port"))
}

/*
func clean(client *firestore.Client) {
	ctx := context.Background()
	iter := client.Collection("appointments").Documents(ctx)

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if doc.Ref.ID == "A1edd69c2-fb71-4c4f-47cc-d14772a5266" {
			continue
		}
		print(doc.Ref.ID)
		client.Collection("appointments").Doc(doc.Ref.ID).Delete(ctx)
	}
}
*/

func NewFirestoreConn() *firestore.Client {
	ctx := context.Background()

	opt := option.WithCredentialsFile("./secret_key/secret_key.json")

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
