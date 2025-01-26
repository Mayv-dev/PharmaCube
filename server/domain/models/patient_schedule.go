package models

import "gorm.io/gorm"

type PatientSchedule struct {
	gorm.Model
	PatientID  uint
	Day        string
	Hour       uint
	Minute     uint
	TimePeriod uint
}
