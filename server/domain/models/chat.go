package models

type Chat struct {
	Common
	PatientID    uint      `json:"patient_id"`
	PharmacistID uint      `json:"pharmacist_id"`
	Messages     []Message `json:"messages"`
}
