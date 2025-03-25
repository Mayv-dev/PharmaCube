package routes

import (
	requesthandlers "pharmacube/server/driving_adapters/rest_api/request_handlers"

	"github.com/gin-gonic/gin"
)

func ChatRoutes(router *gin.Engine) {
	router.POST("/chat/:pharmacist_id/:patient_id", requesthandlers.CreateChat)
	router.POST("/chat", requesthandlers.SendMessage)
	router.GET("/chat/:chat_id/:user_id", requesthandlers.GetChatMessages)
}
