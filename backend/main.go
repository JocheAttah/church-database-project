package main

import (
	"github.com/gin-gonic/gin"

	"github.com/jocheattah/golang-church-database/config"
	"github.com/jocheattah/golang-church-database/routes"
)

func main() {
	r := gin.Default()

	config.ConnectDatabase()

	routes.UserRoutes(r)

	r.Run(":8080")
}
