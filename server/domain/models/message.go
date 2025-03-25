package models

import "time"

type Message struct {
	Common
	TimeSent    time.Time `json:"time_sent"`
	ChatID      uint      `json:"chat_id"`
	SenderID    uint      `json:"sender_id"`
	ReceiverID  uint      `json:"receiver_id"`
	MessageBody string    `json:"message_body"`
}
