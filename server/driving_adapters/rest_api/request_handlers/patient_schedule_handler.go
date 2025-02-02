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

func GetPatientSchedule(context *gin.Context) {
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

	schedule, err := databaseadapters.GetPatientSchedule(patient.ID)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Scheduele not Found"})
		return
	}

	context.JSON(http.StatusOK, schedule)
}

func GetPatientScheduleItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	scheduleId, err := strconv.Atoi(context.Param("schedule_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule ID"})
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

	schedule, err := databaseadapters.GetPatientScheduleItem(patient.ID, uint(scheduleId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Schedule not Found"})
		return
	}

	context.JSON(http.StatusOK, schedule)
}

func CreatePatientScheduleItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	scheduleId, err := strconv.Atoi(context.Param("schedule_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule ID"})
		return
	}

	var newSchedule apimodels.PatientSchedule
	err = context.BindJSON(&newSchedule)
	if err != nil {
		//Invalid json
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid schedule"})
		return
	}

	validator := validator.New()
	err = validator.Struct(newSchedule)
	if err != nil {
		//Invalid
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule"})
		return
	}

	schedule := models.PatientSchedule{
		Day:        newSchedule.Day,
		Hour:       newSchedule.Hour,
		Minute:     newSchedule.Minute,
		TimePeriod: newSchedule.TimePeriod,
	}

	//Get Patient
	_, err = databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	schedule, err = databaseadapters.AddPatientSchedule(schedule)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Schedule not Created"})
		return
	}

	context.JSON(http.StatusOK, schedule)
}

func ModifyPatientScheduleItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	scheduleId, err := strconv.Atoi(context.Param("schedule_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule ID"})
		return
	}

	var newSchedule apimodels.PatientSchedule
	err = context.BindJSON(&newSchedule)
	if err != nil {
		//Invalid json
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid schedule"})
		return
	}

	validator := validator.New()
	err = validator.Struct(newSchedule)
	if err != nil {
		//Invalid
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule1"})
		return
	}

	schedule := models.PatientSchedule{
		Day:        newSchedule.Day,
		Hour:       newSchedule.Hour,
		Minute:     newSchedule.Minute,
		TimePeriod: newSchedule.TimePeriod,
	}

	//Get Patient
	_, err = databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	schedule, err = databaseadapters.UpdatePatientScheduleItem(uint(patientId), uint(scheduleId), schedule)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Schedule not Updated"})
		return
	}

	context.JSON(http.StatusOK, schedule)
}

func DeletePatientScheduleItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	scheduleId, err := strconv.Atoi(context.Param("schedule_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule ID"})
		return
	}

	// Get Patient
	_, err = databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		//Not found
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	err = databaseadapters.DeletePatientScheduleItem(uint(patientId), uint(scheduleId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Schedule not Updated"})
		return
	}

	context.JSON(http.StatusOK, responses.ApiResponse{Data: "Patient Schedule Item Deleted"})

}
