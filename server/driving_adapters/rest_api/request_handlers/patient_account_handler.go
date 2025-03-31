package requesthandlers

import (
	"log"
	"net/http"
	"pharmacube/server/domain/models"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddPatientAccount(context *gin.Context) {
	var patient models.Patient

	err := context.BindJSON(&patient)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient Details"})
		return
	}

	patient, err = databaseadapters.CreatePatientAccount(patient)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to Create Patient Account"})
		return
	}

	context.JSON(http.StatusOK, patient)
}

func GetPatientAccount(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	patient, err := databaseadapters.ReadPatientAccount(uint(patientId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient account not found"})
	}

	context.JSON(http.StatusOK, patient)
}

func ModifyPatientAccount(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	var patient models.Patient

	err = context.BindJSON(&patient)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient Details"})
		return
	}

	patient, err = databaseadapters.UpdatePatientAccount(uint(patientId), patient)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to Update Patient Account"})
		return
	}

	context.JSON(http.StatusOK, patient)
}

func RemovePatientAccount(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	err = databaseadapters.DeletePatientAccount(uint(patientId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient account not Deleted"})
		return
	}

	context.JSON(http.StatusOK, responses.ApiResponse{})
}
