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
