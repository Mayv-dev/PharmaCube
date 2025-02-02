package routes

import (
	requesthandlers "pharmacube/server/driving_adapters/rest_api/request_handlers"

	"github.com/gin-gonic/gin"
)

func PatientRoutes(router *gin.Engine) {
	router.GET("/patient/:patient_id/regime", requesthandlers.GetPatientRegime)
	router.GET("/patient/:patient_id/regime/:regime_id", requesthandlers.GetPatientRegimeItem)

	router.GET("patient/:patient_id/schedule")
	router.GET("patient/:patient_id/schedule/:schedule_id")
	router.POST("patient/:patient_id/schedule")
	router.PUT("patient/:patient_id/schedule/:schedule_id")
	router.DELETE("patient/:patient_id/schedule/:schedule_id")
}
