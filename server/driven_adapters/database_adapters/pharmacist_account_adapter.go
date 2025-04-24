package databaseadapters

import (
	"fmt"
	"log"
	"pharmacube/server/domain/models"
)

func CreatePharmacistAccount(pharmacist models.Pharmacist) (models.Pharmacist, error) {
	dbApdater := GromDbAdapter()

	result := dbApdater.Create(&pharmacist)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return models.Pharmacist{}, fmt.Errorf("Failed to create pharmacist account")
	}

	return pharmacist, nil
}

func ReadPharmacistAccount(pharmacistId uint) (models.Pharmacist, error) {
	var pharmacist models.Pharmacist
	dbAdapter := GromDbAdapter()

	result := dbAdapter.Preload("Patients").First(&pharmacist, pharmacistId)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return models.Pharmacist{}, fmt.Errorf("Failed to find Pharmacist account ID %v", pharmacistId)
	}

	return pharmacist, nil
}

func UpdatePharmacistAccount(pharmacistId uint, newAccountDetails models.Pharmacist) (models.Pharmacist, error) {
	var pharmacist models.Pharmacist
	dbAdapter := GromDbAdapter()

	result := dbAdapter.First(&pharmacist, pharmacistId)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return pharmacist, fmt.Errorf("Failed to Find Pharmacist account ID %v", pharmacistId)
	}

	pharmacist.Name = newAccountDetails.Name
	pharmacist.Email = newAccountDetails.Email
	pharmacist.Password = newAccountDetails.Password
	pharmacist.PharmacyName = newAccountDetails.PharmacyName
	pharmacist.PharmacyAddress1 = newAccountDetails.PharmacyAddress1
	pharmacist.PharmacyAddress2 = newAccountDetails.PharmacyAddress2
	pharmacist.PharmacyAddress3 = newAccountDetails.PharmacyAddress3
	pharmacist.PharmacyPostCode = newAccountDetails.PharmacyPostCode

	result = dbAdapter.Save(&pharmacist)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return pharmacist, fmt.Errorf("Failed to Update Pharmacist account ID %v", pharmacistId)
	}

	return pharmacist, nil
}

func DeletePharmacistAccount(pharmacistId uint) error {
	var pharmacist models.Pharmacist
	dbAdapter := GromDbAdapter()

	result := dbAdapter.First(&pharmacist, pharmacistId)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Failed to Find Pharmacist account ID %v", pharmacistId)
	}

	result = dbAdapter.Delete(&pharmacist)
	if result.Error != nil {
		log.Println(result.Error.Error())
		return fmt.Errorf("Failed to Delete Pharmacist account ID %v", pharmacistId)
	}

	return nil
}
