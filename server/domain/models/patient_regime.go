package models

import "gorm.io/gorm"

type PatientRegime struct {
	gorm.Model
	PatientId     uint
	PharmacistId  uint
	Day           string
	TimePeriod    int
	TimeOffset    int
	Instructions  string
	CompartmentId uint
}
