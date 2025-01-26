package models

import "gorm.io/gorm"

type Pharmacist struct {
	gorm.Model
	Name     string
	Patients []Patient
}
