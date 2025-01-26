package routes

import "github.com/gin-gonic/gin"

func PatientRoutes(router *gin.Engine) {
	router.GET("/patient/:id")
}
