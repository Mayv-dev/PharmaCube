package requesthandlers

import (
	"log"
	"net/http"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"

	"github.com/gin-gonic/gin"
)

func LinkAccounts(context *gin.Context) {
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

	err = databaseadapters.LinkAccounts(uint(pharmacistId), uint(patientId))
	if err != nil {
		//Failed to a link accounts
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to link accounts"})
		return
	}

	context.JSON(http.StatusOK, responses.ApiResponse{Data: "Linked accounts"})
}
