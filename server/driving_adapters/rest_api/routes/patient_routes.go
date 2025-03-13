package routes

import (
	requesthandlers "pharmacube/server/driving_adapters/rest_api/request_handlers"

	"github.com/gin-gonic/gin"
)

func PatientRoutes(router *gin.Engine) {
	router.GET("/patient/:patient_id/regime", requesthandlers.GetPatientRegime)
	router.GET("/patient/:patient_id/regime/:regime_id", requesthandlers.GetPatientRegimeItem)

	router.GET("/patient/:patient_id/schedule", requesthandlers.GetPatientSchedule)
	router.GET("/patient/:patient_id/schedule/:schedule_id", requesthandlers.GetPatientScheduleItem)
	router.POST("/patient/:patient_id/schedule", requesthandlers.CreatePatientScheduleItem)
	router.PUT("/patient/:patient_id/schedule/:schedule_id", requesthandlers.ModifyPatientScheduleItem)
	router.DELETE("patient/:patient_id/schedule/:schedule_id", requesthandlers.DeletePatientScheduleItem)

	router.GET("/patient/:patient_id/scheduledregime", requesthandlers.GetPatientScheduledRegime)
	router.GET("/patient/:patient_id/scheduledregime/:scheduled_regime_id", requesthandlers.GetPatientScheduledRegimeItem)

	router.GET("/patient/:patient_id/history", requesthandlers.GetPatientHistroy)
}
