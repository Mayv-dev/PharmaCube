package databaseadapters

import (
	"fmt"
	"pharmacube/server/domain/models"
)

func GetPatientScheduledRegime(patientId uint) ([]models.PatientScheduledRegime, error) {
	var scheduledRegime []models.PatientScheduledRegime

	DbAtapter := GromDbAdapter()
	result := DbAtapter.Where("patient_id = ?", patientId).Find(&scheduledRegime)
	if result.Error != nil {
		return []models.PatientScheduledRegime{}, fmt.Errorf("Scheduled Regiem not found for patient %v", patientId)
	}

	return scheduledRegime, nil
}

func GetPatientScheduledRegimeItem(patientId uint, scheduleRegimeId uint) (models.PatientScheduledRegime, error) {
	var scheduledRegime models.PatientScheduledRegime

	DbAtapter := GromDbAdapter()
	result := DbAtapter.First(&scheduledRegime, scheduleRegimeId)
	if result.Error != nil {
		return models.PatientScheduledRegime{}, fmt.Errorf("Scheduled Regime not found %v", scheduleRegimeId)
	}

	if scheduledRegime.PatientID != patientId {
		return models.PatientScheduledRegime{}, fmt.Errorf("Schedule not found %v for Patient %v", scheduleRegimeId, patientId)
	}

	return scheduledRegime, nil
}

func AddPatientScheduleRegime(scheduledRegime models.PatientScheduledRegime) (models.PatientScheduledRegime, error) {
	DbAdapter := GromDbAdapter()

	result := DbAdapter.Create(&scheduledRegime)
	if result.Error != nil {
		return scheduledRegime, fmt.Errorf("Failed to create schedule")
	}

	return scheduledRegime, nil
}

func UpdatePatientScheduleRegimeItem(
	patientId uint,
	scheduledRegimeId uint,
	newScheduledRegime models.PatientScheduledRegime) (models.PatientScheduledRegime, error) {
	var scheduledRegime models.PatientScheduledRegime

	dbAdapter := GromDbAdapter()

	//Get old Schedule
	result := dbAdapter.First(&scheduledRegime, scheduledRegimeId)
	if result.Error != nil {
		return models.PatientScheduledRegime{}, fmt.Errorf("Scheduled Regime not found %v", scheduledRegimeId)
	}

	if scheduledRegime.PatientID != patientId {
		return models.PatientScheduledRegime{}, fmt.Errorf("Scheduled Regime not found %v for Patient %v", scheduledRegimeId, patientId)
	}

	//Update schedule regime fields
	scheduledRegime.DateTimeToTake = newScheduledRegime.DateTimeToTake
	scheduledRegime.Instructions = newScheduledRegime.Instructions
	scheduledRegime.Information = newScheduledRegime.Information

	//Update db entry
	result = dbAdapter.Save(&scheduledRegime)
	if result.Error != nil {
		return models.PatientScheduledRegime{}, fmt.Errorf("Error updating scheduled regime %v", scheduledRegimeId)
	}

	return scheduledRegime, nil
}

func DeletePatientScheduleRegimeItem(patientId uint, scheduledRegimeId uint) error {
	var scheduledRegime models.PatientScheduledRegime

	dbAdapter := GromDbAdapter()

	//Get Regime
	result := dbAdapter.First(&scheduledRegime, scheduledRegimeId)
	if result.Error != nil {
		return fmt.Errorf("Scheduled Regime not found %v", scheduledRegimeId)
	}

	if scheduledRegime.PatientID != patientId {
		return fmt.Errorf("Schedule Regime not found %v for Patient %v", scheduledRegimeId, patientId)
	}

	//Delete db entry
	result = dbAdapter.Delete(&scheduledRegime)
	if result.Error != nil {
		return fmt.Errorf("Error deleting scheduled regime %v", scheduledRegimeId)
	}

	return nil
}
