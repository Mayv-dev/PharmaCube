package databaseadapters

import (
	"fmt"
	"pharmacube/server/domain/models"
)

func GetPatientHistory(patientId uint) ([]models.PatientAdherenceRecord, error) {
	var history []models.PatientAdherenceRecord
	dbAdapter := GromDbAdapter()

	result := dbAdapter.Where("patient_id = ?", patientId).Find(&history)
	if result.Error != nil {
		return []models.PatientAdherenceRecord{}, fmt.Errorf("History not found for patient %v", patientId)
	}

	return history, nil
}
