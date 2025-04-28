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

func AddPharmacistAccount(context *gin.Context) {
	var pharmacist models.Pharmacist

	err := context.BindJSON(&pharmacist)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Pharmacist Details"})
		return
	}

	pharmacist, err = databaseadapters.CreatePharmacistAccount(pharmacist)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to Create Pharmacist Account"})
		return
	}

	context.JSON(http.StatusOK, pharmacist)
}

func GetPharmacistAccount(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Pharmacist ID"})
		return
	}

	pharmacist, err := databaseadapters.ReadPharmacistAccount(uint(pharmacistId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Pharmacist account not found"})
		return
	}

	context.JSON(http.StatusOK, pharmacist)
}

func ModifyPharmacistAccount(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Pharmacist ID"})
		return
	}

	var pharmacist models.Pharmacist

	err = context.BindJSON(&pharmacist)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Pharmacist Details"})
		return
	}

	pharmacist, err = databaseadapters.UpdatePharmacistAccount(uint(pharmacistId), pharmacist)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to Update Pharmacist Account"})
		return
	}

	context.JSON(http.StatusOK, pharmacist)
}

func RemovePharmacistAccount(context *gin.Context) {
	pharmacistId, err := strconv.Atoi(context.Param("pharmacist_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Pharmacist ID"})
		return
	}

	err = databaseadapters.DeletePharmacistAccount(uint(pharmacistId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Pharmacist account not Deleted"})
		return
	}

	context.JSON(http.StatusOK, responses.ApiResponse{})
}
