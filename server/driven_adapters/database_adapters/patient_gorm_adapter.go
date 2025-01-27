package databaseadapters

import (
	"fmt"
	"pharmacube/server/domain/models"
)

func GetPatient(id uint) (models.Patient, error) {
	var patient models.Patient

	DbAtapter := GromDbAdapter()
	result := DbAtapter.First(&patient, id)

	if result.Error != nil {
		return models.Patient{}, fmt.Errorf("Patient %v not found", id)
	}

	return patient, nil
}

func GetPatientRegime(id uint) ([]models.PatientRegime, error) {
	var regimes []models.PatientRegime

	DbAtapter := GromDbAdapter()
	result := DbAtapter.Where("patient_id = ?", id).Find(&regimes)
	if result.Error != nil {
		return []models.PatientRegime{}, fmt.Errorf("Regimes not found for patient %v", id)
	}

	return regimes, nil
}
