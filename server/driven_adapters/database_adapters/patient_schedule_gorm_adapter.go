package databaseadapters

import (
	"fmt"
	"pharmacube/server/domain/models"
)

func GetPatientSchedule(id uint) ([]models.PatientSchedule, error) {
	var schedules []models.PatientSchedule

	DbAtapter := GromDbAdapter()
	result := DbAtapter.Where("patient_id = ?", id).Find(&schedules)
	if result.Error != nil {
		return []models.PatientSchedule{}, fmt.Errorf("Schedules not found for patient %v", id)
	}

	return schedules, nil
}

func GetPatientScheduleItem(patientId uint, scheduleId uint) (models.PatientSchedule, error) {
	var schedule models.PatientSchedule

	DbAtapter := GromDbAdapter()
	result := DbAtapter.First(&schedule, scheduleId)
	if result.Error != nil {
		return models.PatientSchedule{}, fmt.Errorf("Schedule not found %v", scheduleId)
	}

	if schedule.PatientID != patientId {
		return models.PatientSchedule{}, fmt.Errorf("Schedule not found %v for Patient %v", scheduleId, patientId)
	}

	return schedule, nil
}

func AddPatientSchedule(schedule models.PatientSchedule) (models.PatientSchedule, error) {
	DbAdapter := GromDbAdapter()

	result := DbAdapter.Create(&schedule)
	if result.Error != nil {
		return schedule, fmt.Errorf("Failed to create schedule")
	}

	return schedule, nil
}
func UpdatePatientScheduleItem(patientId uint, scheduleId uint, newSchedule models.PatientSchedule) (models.PatientSchedule, error) {
	var schedule models.PatientSchedule

	dbAdapter := GromDbAdapter()

	//Get old Schedule
	result := dbAdapter.First(&schedule, scheduleId)
	if result.Error != nil {
		return models.PatientSchedule{}, fmt.Errorf("Schedule not found %v", scheduleId)
	}

	if schedule.PatientID != patientId {
		return models.PatientSchedule{}, fmt.Errorf("Schedule not found %v for Patient %v", scheduleId, patientId)
	}

	//Update regime fields
	schedule.Day = newSchedule.Day
	schedule.Hour = newSchedule.Hour
	schedule.Minute = newSchedule.Minute
	schedule.TimePeriod = newSchedule.TimePeriod

	//Update db entry
	result = dbAdapter.Save(&schedule)
	if result.Error != nil {
		return models.PatientSchedule{}, fmt.Errorf("Error updating regime %v", scheduleId)
	}

	return schedule, nil
}

func DeletePatientScheduleItem(patientId uint, scheduleId uint) error {
	var schedule models.PatientSchedule

	dbAdapter := GromDbAdapter()

	//Get Regime
	result := dbAdapter.First(&schedule, scheduleId)
	if result.Error != nil {
		return fmt.Errorf("Scheduele not found %v", scheduleId)
	}

	if schedule.PatientID != patientId {
		return fmt.Errorf("Schedule not found %v for Patient %v", scheduleId, patientId)
	}

	//Delete db entry
	result = dbAdapter.Delete(&schedule)
	if result.Error != nil {
		return fmt.Errorf("Error deleting schedule %v", scheduleId)
	}

	return nil
}
