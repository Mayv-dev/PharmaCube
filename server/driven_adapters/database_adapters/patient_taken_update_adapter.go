package databaseadapters

import (
	"fmt"
	"log"
	"pharmacube/server/domain/models"
)

func UpdatePatientTaken(
	patientId uint,
	scheduledRegime models.PatientScheduledRegime,
	update models.PatientAdherenceRecord) error {

	dbAdaper := GromDbAdapter()

	result := dbAdaper.Create(&update)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Error Create Histroy Record for Patient ID %v", patientId)
	}

	result = dbAdaper.Delete(&scheduledRegime)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Error deleting scheduled regime ID %v", scheduledRegime.ID)
	}

	return nil
}
