package routes

import (
	requesthandlers "pharmacube/server/driving_adapters/rest_api/request_handlers"

	"github.com/gin-gonic/gin"
)

func PatientRoutes(router *gin.Engine) {
	router.GET("/patient/:patient_id/regime", requesthandlers.GetPatientRegime)
	router.GET("/patient/:patient_id/regime/:regime_id", requesthandlers.GetPatientRegimeItem)
}
