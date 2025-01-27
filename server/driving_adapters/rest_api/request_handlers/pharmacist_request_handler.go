package requesthandlers

import (
	"log"
	"net/http"
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
		Day:                   int(apiRegime.Day),
		TimePeriod:            int(apiRegime.TimePeriod),
		TimeOffset:            apiRegime.TimeOffset,
		Instructions:          apiRegime.Instruction,
		CompartmentID:         uint(apiRegime.CompartmentID),
	}

	err = databaseadapters.AddRegime(patientId, pharmacistId, regime)
	if err != nil {
		//Failed to insert
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to Create"})
		return
	}

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
