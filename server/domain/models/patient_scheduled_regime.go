package models

import (
	"time"

	"gorm.io/gorm"
)

type PatientScheduledRegime struct {
	gorm.Model
	DateTimeToTake time.Time
	Compartment    uint
	Instructions   string
	PatientID      uint
}
