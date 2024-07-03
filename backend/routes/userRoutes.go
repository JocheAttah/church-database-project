package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/jocheattah/golang-church-database/controllers"
)

func UserRoutes(router *gin.Engine) {
	router.POST("/users", controllers.CreateUser)
	// Add more routes as needed
}
