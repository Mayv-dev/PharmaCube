package databaseadapters

import (
	"fmt"
	"log"
	"pharmacube/server/domain/models"
)

func AddMessage(message models.Message) error {
	dbAdapter := GromDbAdapter()
	var chat models.Chat

	result := dbAdapter.First(&chat, message.ChatID)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return result.Error
	}

	result = dbAdapter.Create(&message)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func GetMessages(userId uint, chatId uint) ([]models.Message, error) {
	dbAdapter := GromDbAdapter()
	var chat models.Chat
	var messages []models.Message

	result := dbAdapter.First(&chat, chatId)
	if result.Error != nil {
		return nil, result.Error
	}

	result = dbAdapter.Where("chat_id = ?", chatId).Find(&messages)
	if result.Error != nil {
		return nil, result.Error
	}

	if userId != chat.PatientID && userId != chat.PharmacistID {
		return nil, fmt.Errorf("Not chat member")
	}
	return messages, nil
}

func CreateChat(chat models.Chat) (models.Chat, error) {
	dbAdapter := GromDbAdapter()

	result := dbAdapter.Create(&chat)
	if result != nil {
		return models.Chat{}, result.Error
	}

	return chat, nil
}
