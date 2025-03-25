package requesthandlers

import (
	"log"
	"net/http"
	"pharmacube/server/domain/models"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"

	"github.com/gin-gonic/gin"
)

func SendMessage(context *gin.Context) {
	var message models.Message
	err := context.BindJSON(&message)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Message"})
		return
	}

	err = databaseadapters.AddMessage(message)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Message not sent"})
		return
	}

	context.JSON(http.StatusOK, responses.ApiResponse{Data: "Message sent"})
}

func GetChatMessages(context *gin.Context) {
	chatId, err := strconv.Atoi(context.Param("chat_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Chat ID"})
		return
	}

	userId, err := strconv.Atoi(context.Param("user_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid User ID"})
		return
	}

	messages, err := databaseadapters.GetMessages(uint(chatId), uint(userId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Unable to fetch messages"})
		return
	}

	context.JSON(http.StatusOK, messages)
}

func CreateChat(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Pharmacist ID"})
		return
	}

	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	chat := models.Chat{
		PharmacistID: uint(pharmacistId),
		PatientID:    uint(patientId),
	}

	chat, err = databaseadapters.CreateChat(chat)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to initailise Chat"})
		return
	}

	context.JSON(http.StatusOK, chat)
}
