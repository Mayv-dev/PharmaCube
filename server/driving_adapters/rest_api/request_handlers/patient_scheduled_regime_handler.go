package requesthandlers

import (
	"log"
	"net/http"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetPatientScheduledRegime(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	scheduledRegime, err := databaseadapters.GetPatientScheduledRegime(patient.ID)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Schedueled Regime not Found"})
		return
	}

	context.JSON(http.StatusOK, scheduledRegime)
}

func GetPatientScheduledRegimeItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	scheduledRegimeId, err := strconv.Atoi(context.Param("scheduled_regime_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Scheduled Regime ID"})
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

	scheduledRegime, err := databaseadapters.GetPatientScheduledRegimeItem(patient.ID, uint(scheduledRegimeId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Scheduled Regime not Found"})
		return
	}

	context.JSON(http.StatusOK, scheduledRegime)
}
