package databaseadapters

import (
	"fmt"
	"pharmacube/server/domain/models"
)

func AddRegime(pharmacistId int, patientId int, regime models.PatientRegime) error {
	DbAdapter := GromDbAdapter()

	result := DbAdapter.Create(&regime)
	if result.Error != nil {
		return fmt.Errorf("Failed to create regime")
	}

	return nil
}
