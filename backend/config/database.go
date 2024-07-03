package config

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/jocheattah/golang-church-database/models"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=db user=postgres dbname=postgres sslmode=disable password=postgres"
	database, err := gorm.Open("postgres", dsn)
	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&models.User{})
	DB = database
}
