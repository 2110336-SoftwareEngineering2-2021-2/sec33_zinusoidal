package auth_repo

import (
	"github.com/2110336-SoftwareEngineering2-2021-2/sec33_zinusoidal/backend/repository/auth_repo/model"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type GromDB struct {
	database *gorm.DB
}

func New(db *gorm.DB) *GromDB {
	return &GromDB{database: db}
}

func (db *GromDB) RegisterCustomer(customer model.Customer) error {
	insert_user := `INSERT INTO fortune_user(id,username,citizen_id,email,password,user_type, create_datetime)
    VALUES (?, ? , ? , ? ,?, ? ,NOW());`
	/**
	* user_type = 0 for customer
	 */
	err := db.database.Exec(insert_user, customer.UserId, customer.Username,
		customer.CitizenId, customer.Email, customer.Password, false).Error
	if err != nil {
		return err
	}
	insert_customer := `INSERT INTO customer(id,first_name,last_name,profile_image)
    VALUES (?, ?, ?, ?);`
	err = db.database.Exec(insert_customer, customer.UserId,
		customer.FirstName, customer.LastName, customer.ProfilePicUrl).Error
	return err
}

func (db *GromDB) RegisterProvider(provider model.Provider) error {

	insert_user := `INSERT INTO fortune_user(id,username,citizen_id,email,password, user_type, create_datetime)
    VALUES (?, ? , ? , ? ,?, ? ,NOW());`
	err := db.database.Exec(insert_user, provider.UserId, provider.Username,
		provider.CitizenId, provider.Email, provider.Password, true).Error

	if err != nil {
		return err
	}
	insert_provider := `INSERT INTO provider(id,first_name,last_name,profile_image,biography, work_schedule)
	VALUES (? , ?, ?, ?, ?, ?)`
	err = db.database.Exec(insert_provider, provider.UserId, provider.FirstName, provider.LastName, provider.ProfilePicUrl,
		provider.Biography, provider.Schedule).Error
	if err != nil {
		return err
	}

	insert_fortune := `INSERT INTO provider_service(provider_id, fortune_type, price)
	VALUES (?, ?, ?);`

	for _, fortune := range provider.FortuneList {
		err = db.database.Exec(insert_fortune, provider.UserId, fortune.FortuneType, fortune.Price).Error
		if err != nil {
			return err
		}
	}

	return nil
}

func (db *GromDB) Login(username, password string) (string, error) {

	login_command := `SELECT U.id, U.password
	FROM fortune_user U
	WHERE U.username = ?`
	var result struct {
		UserId   string `gorm:"column:id"`
		Password string `gorm:"column:password"`
	}
	err := db.database.Raw(login_command, username).Scan(&result).Error
	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(password))
	if err != nil {
		return "", err
	}

	return result.UserId, err
}

func (db *GromDB) InsertConfirmationKey(userId, key string) error {
	insert_key := `INSERT INTO activation_key(id, activation_key)
	VALUES (? , ?);`
	return db.database.Exec(insert_key, userId, key).Error
}

func (db *GromDB) ConfirmEmail(key string) error {
	confirmEmailCommand := `UPDATE fortune_user
    SET email_confirmed = 1
    WHERE EXISTS
    (
        SELECT 1
        FROM activation_key
        WHERE fortune_user.id = activation_key.id AND activation_key.activation_key = ?
    );`

	return db.database.Raw(confirmEmailCommand, key).Error
}
