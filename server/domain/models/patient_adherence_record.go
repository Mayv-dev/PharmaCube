package models

import (
	"time"

	"gorm.io/gorm"
)

type PatientAdherenceRecord struct {
	gorm.Model
	PatientID         uint
	DateTimeScheduled time.Time
	DateTimeTaken     time.Time
	WasTaken          bool
}
