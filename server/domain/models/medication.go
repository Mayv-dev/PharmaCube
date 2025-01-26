package models

import "gorm.io/gorm"

type Medication struct {
	gorm.Model
	Name           string
	DoseAmount     string
	Details        string
	PatientRegimes []PatientRegime `gorm:"many2many:medication_regimes;"`
}
