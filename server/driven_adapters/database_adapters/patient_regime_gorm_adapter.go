package databaseadapters

import (
	"fmt"
	"pharmacube/server/domain/models"
)

func AddRegime(regime models.PatientRegime) (models.PatientRegime, error) {
	DbAdapter := GromDbAdapter()

	result := DbAdapter.Create(&regime)
	if result.Error != nil {
		return regime, fmt.Errorf("Failed to create regime")
	}

	return regime, nil
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

func GetPatientRegimeItem(patientId uint, regimeId uint) (models.PatientRegime, error) {
	var regime models.PatientRegime

	DbAtapter := GromDbAdapter()
	result := DbAtapter.First(&regime, regimeId)
	if result.Error != nil {
		return models.PatientRegime{}, fmt.Errorf("Regime not found %v", regimeId)
	}

	if regime.PatientID != patientId {
		return models.PatientRegime{}, fmt.Errorf("Regime not found %v for Patient %v", regimeId, patientId)
	}

	return regime, nil
}

func UpdatePatientRegimeItem(patientId uint, regimeId uint, newRegime models.PatientRegime) (models.PatientRegime, error) {
	var regime models.PatientRegime

	dbAdapter := GromDbAdapter()

	//Get old Regime
	result := dbAdapter.First(&regime, regimeId)
	if result.Error != nil {
		return models.PatientRegime{}, fmt.Errorf("Regime not found %v", regimeId)
	}

	if regime.PatientID != patientId {
		return models.PatientRegime{}, fmt.Errorf("Regime not found %v for Patient %v", regimeId, patientId)
	}

	//Update regime fields
	regime.Instructions = newRegime.Instructions
	regime.MedicationInformation = newRegime.MedicationInformation
	regime.CompartmentID = newRegime.CompartmentID
	regime.Day = newRegime.Day
	regime.TimePeriod = newRegime.TimePeriod
	regime.TimeOffset = newRegime.TimeOffset

	//Update db entry
	result = dbAdapter.Save(&regime)
	if result.Error != nil {
		return models.PatientRegime{}, fmt.Errorf("Error updating regime %v", regimeId)
	}

	return regime, nil
}

func DeletePatientRegimeItem(patientId uint, regimeId uint) error {
	var regime models.PatientRegime

	dbAdapter := GromDbAdapter()

	//Get Regime
	result := dbAdapter.First(&regime, regimeId)
	if result.Error != nil {
		return fmt.Errorf("Regime not found %v", regimeId)
	}

	if regime.PatientID != patientId {
		return fmt.Errorf("Regime not found %v for Patient %v", regimeId, patientId)
	}

	//Delete db entry
	result = dbAdapter.Delete(&regime)
	if result.Error != nil {
		return fmt.Errorf("Error deleting regime %v", regimeId)
	}

	return nil
}
