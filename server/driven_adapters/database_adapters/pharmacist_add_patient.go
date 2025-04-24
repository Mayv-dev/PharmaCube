package databaseadapters

import (
	"fmt"
	"log"
	"pharmacube/server/domain/models"
)

func LinkAccounts(pharmacistId uint, patientId uint) error {
	var patient models.Patient
	dbAdapter := GromDbAdapter()

	result := dbAdapter.First(&patient, patientId)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Failed to Find Patient account ID %v", patientId)
	}

	patient.PharmacistID = pharmacistId

	result = dbAdapter.Save(&patient)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Failed to Update Patient account ID %v", patient)
	}

	return nil
}
