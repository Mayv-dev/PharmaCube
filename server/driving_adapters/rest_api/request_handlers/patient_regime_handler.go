package requesthandlers

import (
	"log"
	"net/http"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetPatientRegime(context *gin.Context) {
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

	regime, err := databaseadapters.GetPatientRegime(patient.ID)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Regime not Found"})
		return
	}

	context.JSON(http.StatusOK, regime)
}

func GetPatientRegimeItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalide Patient ID"})
		return
	}

	regimeId, err := strconv.Atoi(context.Param("patient_id"))
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

	regime, err := databaseadapters.GetPatientRegimeItem(patient.ID, uint(regimeId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Regime not Found"})
		return
	}

	context.JSON(http.StatusOK, regime)
}
