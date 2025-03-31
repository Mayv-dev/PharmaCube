package databaseadapters

import (
	"fmt"
	"log"
	"pharmacube/server/domain/models"
	"time"
)

func UpdateTaken(patientId uint, scheduledRegimeId uint, wasTaken bool) error {
	var scheduledRegime models.PatientScheduledRegime
	dbAdapter := GromDbAdapter()

	result := dbAdapter.First(scheduledRegime, scheduledRegimeId)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Error finding Scheduled Regime Item ID %v", scheduledRegimeId)
	}

	if patientId != scheduledRegime.PatientID {
		log.Println(result.Error.Error())
		return fmt.Errorf("Error patient ID mismatch. Patient %v, Record %v", patientId, scheduledRegimeId)
	}

	history := models.PatientAdherenceRecord{
		PatientID:             patientId,
		MedicationInformation: scheduledRegime.Information,
		DateTimeScheduled:     scheduledRegime.DateTimeToTake,
		DateTimeTaken:         time.Now(),
		WasTaken:              wasTaken,
	}

	result = dbAdapter.Create(&history)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Error creating history Item")
	}

	result = dbAdapter.Delete(&scheduledRegime, scheduledRegimeId)
	if result != nil {
		log.Println(result.Error.Error())
		log.Printf("Error Deleted Scheduled Regime Item %v", scheduledRegimeId)
	}

	return nil
}
