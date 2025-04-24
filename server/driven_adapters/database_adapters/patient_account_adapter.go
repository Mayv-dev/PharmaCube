package databaseadapters

import (
	"fmt"
	"log"
	"pharmacube/server/domain/models"
)

func CreatePatientAccount(patient models.Patient) (models.Patient, error) {
	dbApdater := GromDbAdapter()

	result := dbApdater.Create(&patient)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return models.Patient{}, fmt.Errorf("Failed to create Patient account")
	}

	return patient, nil
}

func ReadPatientAccount(patientId uint) (models.Patient, error) {
	var patient models.Patient
	dbAdapter := GromDbAdapter()

	result := dbAdapter.First(&patient, patientId)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return models.Patient{}, fmt.Errorf("Failed to find Patient account ID %v", patientId)
	}

	return patient, nil
}

func UpdatePatientAccount(patientId uint, newAccountDetails models.Patient) (models.Patient, error) {
	var patient models.Patient
	dbAdapter := GromDbAdapter()

	result := dbAdapter.Preload("Chats").Preload("PatientSchedules").Preload("PatientRegimes").Preload("PatientScheduledRegimes").Preload("PatientAdherenceRecords").First(&patient, patientId)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return patient, fmt.Errorf("Failed to Find Patient account ID %v", patientId)
	}

	patient.Name = newAccountDetails.Name
	patient.ScheduleTimes = newAccountDetails.ScheduleTimes
	patient.ScheduledRegimes = newAccountDetails.ScheduledRegimes
	patient.AdherenceRecord = newAccountDetails.AdherenceRecord

	result = dbAdapter.Save(&patient)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return patient, fmt.Errorf("Failed to Update Patient account ID %v", patient)
	}

	return patient, nil
}

func DeletePatientAccount(patientId uint) error {
	var patient models.Patient
	dbAdapter := GromDbAdapter()

	result := dbAdapter.First(&patient, patientId)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Failed to Find Patient account ID %v", patientId)
	}

	result = dbAdapter.Delete(&patient)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Failed to Delete Patient account ID %v", patientId)
	}

	return nil
}
