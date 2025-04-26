package routes

import (
	requesthandlers "pharmacube/server/driving_adapters/rest_api/request_handlers"

	"github.com/gin-gonic/gin"
)

func ResetRoute(router *gin.Engine) {
	router.GET("/reset", requesthandlers.HandleReset)
}
