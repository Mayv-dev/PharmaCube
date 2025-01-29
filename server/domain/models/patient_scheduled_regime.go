package models

import (
	"time"
)

type PatientScheduledRegime struct {
	Common
	DateTimeToTake time.Time `json:"date_time_to_take"`
	CompartmentID  uint      `json:"compartment_id"`
	Instructions   string    `json:"instuction"`
	Information    string    `json:"information"`
	PatientID      uint      `json:"patient_id"`
}
