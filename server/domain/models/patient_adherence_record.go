package models

import (
	"time"
)

type PatientAdherenceRecord struct {
	Common
	PatientID             uint      `json:"patient_id"`
	MedicationInformation string    `json:"information"`
	DateTimeScheduled     time.Time `json:"date_time_scheduled"`
	DateTimeTaken         time.Time `json:"date_time_taken"`
	WasTaken              bool      `json:"was_taken"`
	TimePeriod            uint      `json:"time_period"`
}
