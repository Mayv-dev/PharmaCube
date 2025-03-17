package models

import "time"

type Message struct {
	Common
	TimeSent    time.Time `json:"time_sent"`
	SenderID    uint      `json:"sender_id"`
	MessageBody string    `json:"message_body"`
}
