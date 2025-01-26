package models

import "gorm.io/gorm"

type PatientRegime struct {
	gorm.Model
	PatientID             uint
	PharmacistID          uint
	MedicationInformation string
	Day                   int
	TimePeriod            int
	TimeOffset            int
	Instructions          string
	CompartmentID         uint
}
