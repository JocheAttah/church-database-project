package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jocheattah/golang-church-database/config"
	"github.com/jocheattah/golang-church-database/models"
)

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

// Add more handlers as needed (e.g., GetUser, UpdateUser, DeleteUser)
