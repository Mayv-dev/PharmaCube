package main

import (
	"pharmacube/server/domain/models"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"

	"gorm.io/gorm"
)

var DbAdapter *gorm.DB

func main() {
	DbAdapter = databaseadapters.GromDbAdapter()

	DbAdapter.AutoMigrate(
		&models.Patient{},
		&models.Pharmacist{},
		&models.PatientRegime{},
		&models.PatientSchedule{},
		&models.PatientScheduledRegime{},
		&models.PatientAdherenceRecord{},
		&models.Medication{})
}
