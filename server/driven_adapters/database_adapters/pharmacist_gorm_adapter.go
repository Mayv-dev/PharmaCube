package databaseadapters

import (
	"fmt"
	"pharmacube/server/domain/models"
)

func GetPharmacist(id int) (models.Pharmacist, error) {
	var pharmacist models.Pharmacist

	dbApater := GromDbAdapter()
	result := dbApater.First(&pharmacist, id)
	if result.Error != nil {
		return models.Pharmacist{}, fmt.Errorf("Pharmacist ID %v not found", id)
	}

	return pharmacist, nil
}
