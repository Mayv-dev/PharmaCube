package models

import "gorm.io/gorm"

type Patient struct {
	gorm.Model
	Name             string
	ScheduleTimes    []PatientSchedule
	ScheduledRegimes []PatientScheduledRegime
	AdherenceRecord  []PatientAdherenceRecord
	PharmacistID     uint
}
