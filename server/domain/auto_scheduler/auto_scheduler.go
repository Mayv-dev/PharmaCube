package autoscheduler

import (
	"fmt"
	"log"
	"pharmacube/server/domain"
	"pharmacube/server/domain/models"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"time"
)

func AutoScheduleRegime(patientId uint) error {
	//Patient Schedule
	schedule, err := databaseadapters.GetPatientSchedule(patientId)
	if err != nil {
		log.Println(err.Error())
		return fmt.Errorf("Schedule for Patient %v Not Found", patientId)
	}

	//Patient Regime
	regime, err := databaseadapters.GetPatientRegime(patientId)
	if err != nil {
		log.Println(err.Error())
		return fmt.Errorf("Regime for Patient %v Not Found", patientId)
	}

	//Patient Schedule Regime
	scheduledRegime, err := databaseadapters.GetPatientScheduledRegime(patientId)
	if err != nil {
		log.Println(err.Error())
		return fmt.Errorf("Existing Schedule Regime for Patient %v Not Found", patientId)
	}

	//Deleting all Scheduled Regime Items for Now
	//Need solution for finding items to be updated
	//Recreating all easier for now
	for _, scheduleRegimeItem := range scheduledRegime {
		err = databaseadapters.DeletePatientScheduleRegimeItem(patientId, scheduleRegimeItem.ID)
		if err != nil {
			log.Println(err.Error())
			return fmt.Errorf("Deleting Existing Schedule Regime %v for Patient %v Not Completed", scheduleRegimeItem.ID, patientId)
		}
	}

	//Loop through Regime
	//Find corresponding Schedule
	//Create new Items
	for _, regimeItem := range regime {
		day := toDay(regimeItem.Date, regimeItem.Month, regimeItem.Year)
		timePeriod := regimeItem.TimePeriod

		var correspondingSchedule models.PatientSchedule

		for _, scheduleItem := range schedule {
			if domain.Day(scheduleItem.Day) == day &&
				timePeriod == int(scheduleItem.TimePeriod) {
				correspondingSchedule = scheduleItem
				break
			}
		}

		scheduledRegimeItem := models.PatientScheduledRegime{
			DateTimeToTake: time.Date(
				regimeItem.Year,
				time.Month(regimeItem.Month),
				regimeItem.Date,
				int(correspondingSchedule.Hour),
				int(correspondingSchedule.Minute),
				0, 0, time.Local),
			CompartmentID: regimeItem.CompartmentID,
			Information:   regimeItem.MedicationInformation,
			Instructions:  regimeItem.Instructions,
			PatientID:     patientId,
		}

		_, err = databaseadapters.AddPatientScheduleRegime(scheduledRegimeItem)
		if err != nil {
			log.Println(err.Error())
			return fmt.Errorf("Creating Schedule Regime for Patient %v Not Completed", patientId)
		}
	}

	return nil
}

func toDay(date int, month int, year int) domain.Day {
	if month < 3 {
		month += 12
		year -= 1
	}

	K := year % 100
	J := year / 100

	h := (date + (13*(month+1))/5 + K + K/4 + J/4 + J*5) % 7

	days := []domain.Day{domain.Saturday, domain.Sunday, domain.Monday, domain.Tuesday, domain.Wednesday, domain.Thursday, domain.Friday}

	return days[h]
}
