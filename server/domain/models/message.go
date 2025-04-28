package models

type Message struct {
	Common
	ChatID          uint   `json:"chat_id"`
	IsSenderPatient bool   `json:"is_sender_patient"`
	MessageBody     string `json:"message_body"`
}
