package models

import "time"

type Chat struct {
	Common
	PatientID           uint      `json:"patient_id"`
	PharmacistID        uint      `json:"pharmacist_id"`
	Messages            []Message `json:"messages"`
	LastMessageTime     time.Time `json:"last_message_time"`
	LastSenderIsPatient bool      `json:"last_sender_is_patient"`
}
