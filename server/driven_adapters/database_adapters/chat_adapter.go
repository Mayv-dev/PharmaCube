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

	if (chat.PatientID != message.SenderID || chat.PatientID != message.ReceiverID) &&
		(chat.PharmacistID != message.SenderID || chat.PharmacistID != message.ReceiverID) {
		return fmt.Errorf("Chat participant IDs do not match message IDs")
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

	result := dbAdapter.First(&chat, chatId)
	if result.Error != nil {
		return nil, result.Error
	}

	if userId != chat.PatientID || userId != chat.PharmacistID {
		return nil, fmt.Errorf("Not chat member")
	}

	return chat.Messages, nil
}

func CreateChat(chat models.Chat) (models.Chat, error) {
	dbAdapter := GromDbAdapter()

	result := dbAdapter.Create(&chat)
	if result != nil {
		return models.Chat{}, result.Error
	}

	return chat, nil
}
