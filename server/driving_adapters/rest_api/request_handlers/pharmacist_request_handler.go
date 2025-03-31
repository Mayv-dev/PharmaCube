package requesthandlers

import (
	"log"
	"net/http"
	autoscheduler "pharmacube/server/domain/auto_scheduler"
	"pharmacube/server/domain/models"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	apimodels "pharmacube/server/driving_adapters/rest_api/api_models"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func AddRegimeItem(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Pharmacist ID"})
		return
	}

	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Patient ID"})
		return
	}

	//Get Patient
	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	//Check is Pharmacists patient
	if patient.PharmacistID != uint(pharmacistId) {
		//Not patient of pharmacist
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Pharmacist does not have Patient"})
		return
	}

	//Create Regime Item
	var apiRegime apimodels.Regime
	err = context.BindJSON(&apiRegime)
	if err != nil {
		//Invalid json
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Regime"})
		return
	}

	validator := validator.New()
	err = validator.Struct(apiRegime)
	if err != nil {
		//Invalid
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Regime"})
		return
	}

	//Add to DB
	regime := models.PatientRegime{
		PharmacistID:          patient.PharmacistID,
		PatientID:             patient.ID,
		MedicationInformation: apiRegime.Information,
		Date:                  int(apiRegime.Date),
		Month:                 int(apiRegime.Month),
		Year:                  int(apiRegime.Year),
		TimePeriod:            int(apiRegime.TimePeriod),
		TimeOffset:            apiRegime.TimeOffset,
		Instructions:          apiRegime.Instructions,
		CompartmentID:         uint(apiRegime.CompartmentID),
	}

	regime, err = databaseadapters.AddRegime(regime)
	if err != nil {
		//Failed to insert
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to Create"})
		return
	}

	autoscheduler.AutoScheduleRegime(uint(patientId))
	//Return
	context.JSON(http.StatusOK, regime)
}

func ViewAllPatientRegime(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Pharmacist ID"})
		return
	}

	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Patient ID"})
		return
	}

	//Get Patient
	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	//Check is Pharmacists patient
	if patient.PharmacistID != uint(pharmacistId) {
		//Not patient of pharmacist
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Pharmacist does not have Patient"})
		return
	}

	regime, err := databaseadapters.GetPatientRegime(patient.ID)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Regime not Found"})
		return
	}

	context.JSON(http.StatusOK, regime)
}

func ViewPatientRegime(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Pharmacist ID"})
		return
	}

	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Patient ID"})
		return
	}

	regimeId, err := strconv.Atoi(context.Param("regime_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Regime ID"})
		return
	}

	//Get Patient
	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	//Check is Pharmacists patient
	if patient.PharmacistID != uint(pharmacistId) {
		//Not patient of pharmacist
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Pharmacist does not have Patient"})
		return
	}

	regime, err := databaseadapters.GetPatientRegimeItem(patient.ID, uint(regimeId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Regime not Found"})
		return
	}

	context.JSON(http.StatusOK, regime)
}

func UpdatePatientRegime(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Pharmacist ID"})
		return
	}

	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Patient ID"})
		return
	}

	regimeId, err := strconv.Atoi(context.Param("regime_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Regime ID"})
		return
	}

	//Get Patient
	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	//Check is Pharmacists patient
	if patient.PharmacistID != uint(pharmacistId) {
		//Not patient of pharmacist
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Pharmacist does not have Patient"})
		return
	}

	//Create Regime Item
	var apiRegime apimodels.Regime
	err = context.BindJSON(&apiRegime)
	if err != nil {
		//Invalid json
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Regime"})
		return
	}

	validator := validator.New()
	err = validator.Struct(apiRegime)
	if err != nil {
		//Invalid
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Regime"})
		return
	}

	//Add to DB
	regime := models.PatientRegime{
		PharmacistID:          patient.PharmacistID,
		PatientID:             patient.ID,
		MedicationInformation: apiRegime.Information,
		Date:                  int(apiRegime.Date),
		Month:                 int(apiRegime.Month),
		Year:                  int(apiRegime.Year),
		TimePeriod:            int(apiRegime.TimePeriod),
		TimeOffset:            apiRegime.TimeOffset,
		Instructions:          apiRegime.Instructions,
		CompartmentID:         uint(apiRegime.CompartmentID),
	}

	regime, err = databaseadapters.UpdatePatientRegimeItem(patient.ID, uint(regimeId), regime)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Regime not Updated"})
		return
	}

	autoscheduler.AutoScheduleRegime(uint(patientId))

	context.JSON(http.StatusOK, regime)
}

func DeletePatientRegime(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Pharmacist ID"})
		return
	}

	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Patient ID"})
		return
	}

	regimeId, err := strconv.Atoi(context.Param("regime_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Regime ID"})
		return
	}

	//Get Patient
	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	//Check is Pharmacists patient
	if patient.PharmacistID != uint(pharmacistId) {
		//Not patient of pharmacist
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Pharmacist does not have Patient"})
		return
	}

	err = databaseadapters.DeletePatientRegimeItem(patient.ID, uint(regimeId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Regime not Updated"})
		return
	}

	autoscheduler.AutoScheduleRegime(uint(patientId))

	context.JSON(http.StatusOK, responses.ApiResponse{Data: "Deleted regime item"})
}

func PharmacistViewPatientHistory(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Pharmacist ID"})
		return
	}

	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	//Get Pharmacist
	pharmacist, err := databaseadapters.GetPharmacist(pharmacistId)
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Pharmacist not Found"})
	}

	//Get Patient
	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	//Check is Pharmacists patient
	if patient.PharmacistID != pharmacist.ID {
		//Not patient of pharmacist
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Pharmacist does not have Patient"})
		return
	}

	patientHistory, err := databaseadapters.GetPatientHistory(patient.ID)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Error finding Patient History"})
	}

	context.JSON(http.StatusOK, patientHistory)
}
