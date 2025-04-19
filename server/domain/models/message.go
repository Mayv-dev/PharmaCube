package models

import "time"

type Message struct {
	Common
	TimeSent        time.Time `json:"time_sent"`
	ChatID          uint      `json:"chat_id"`
	IsSenderPatient bool      `json:"is_sender_patient"`
	MessageBody     string    `json:"message_body"`
}
