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

func GetMockPatientSchedule(context *gin.Context) {
	patientId := context.Param("patient_id")
	log.Printf("Returning mock schedule for patient ID: %s", patientId)

	// ✅ Local mock-only structs
	type Medication struct {
		ID     int    `json:"id"`
		Name   string `json:"name"`
		Amount string `json:"amount"`
	}

	type MockSchedule struct {
		ID          int          `json:"id"`
		Day         int          `json:"day"`
		Hour        int          `json:"hour"`
		Minute      int          `json:"minute"`
		TimePeriod  int          `json:"time_period"`
		Taken       bool         `json:"taken"`
		Medications []Medication `json:"medications"`
	}

	mockSchedule := []MockSchedule{
		{
			ID:         1,
			Day:        1,
			Hour:       8,
			Minute:     30,
			TimePeriod: 1,
			Taken:      false,
			Medications: []Medication{
				{ID: 1, Name: "Paracetamol", Amount: "500mg"},
			},
		},
		{
			ID:         2,
			Day:        1,
			Hour:       13,
			Minute:     0,
			TimePeriod: 2,
			Taken:      true,
			Medications: []Medication{
				{ID: 2, Name: "Aspirin", Amount: "100mg"},
			},
		},
	}

	context.JSON(http.StatusOK, mockSchedule)
}

func GetPatientSchedule(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient not Found"})
		return
	}

	schedule, err := databaseadapters.GetPatientSchedule(patient.ID)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Patient Schedule not Found"})
		return
	}

	context.JSON(http.StatusOK, schedule)
}

func GetPatientScheduleItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	scheduleId, err := strconv.Atoi(context.Param("schedule_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule ID"})
		return
	}

	patient, err := databaseadapters.GetPatient(uint(patientId))
	if err != nil {
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
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	var newSchedule apimodels.PatientSchedule
	err = context.BindJSON(&newSchedule)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid schedule"})
		return
	}

	validator := validator.New()
	err = validator.Struct(newSchedule)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule"})
		return
	}

	schedule := models.PatientSchedule{
		PatientID:  uint(patientId),
		Day:        newSchedule.Day,
		Hour:       newSchedule.Hour,
		Minute:     newSchedule.Minute,
		TimePeriod: newSchedule.TimePeriod,
	}

	_, err = databaseadapters.GetPatient(uint(patientId))
	if err != nil {
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

	autoscheduler.AutoScheduleRegime(uint(patientId))

	context.JSON(http.StatusOK, schedule)
}

func ModifyPatientScheduleItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	scheduleId, err := strconv.Atoi(context.Param("schedule_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule ID"})
		return
	}

	var newSchedule apimodels.PatientSchedule
	err = context.BindJSON(&newSchedule)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid schedule"})
		return
	}

	validator := validator.New()
	err = validator.Struct(newSchedule)
	if err != nil {
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

	_, err = databaseadapters.GetPatient(uint(patientId))
	if err != nil {
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

	autoscheduler.AutoScheduleRegime(uint(patientId))

	context.JSON(http.StatusOK, schedule)
}

func DeletePatientScheduleItem(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	scheduleId, err := strconv.Atoi(context.Param("schedule_id"))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Schedule ID"})
		return
	}

	_, err = databaseadapters.GetPatient(uint(patientId))
	if err != nil {
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

	autoscheduler.AutoScheduleRegime(uint(patientId))

	context.JSON(http.StatusOK, responses.ApiResponse{Data: "Patient Schedule Item Deleted"})
}
