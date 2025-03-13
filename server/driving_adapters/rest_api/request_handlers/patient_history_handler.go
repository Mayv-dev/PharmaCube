package requesthandlers

import (
	"log"
	"net/http"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetPatientHistroy(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	histroy, err := databaseadapters.GetPatientHistory(uint(patientId))
	if err != nil {
		//Error getting history
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "History not found"})
		return
	}

	context.JSON(http.StatusFound, histroy)
}
