package routes

import (
	requesthandlers "pharmacube/server/driving_adapters/rest_api/request_handlers"

	"github.com/gin-gonic/gin"
)

func AddPharmacistRoutes(router *gin.Engine) {
	router.POST("pharmacist/:pharmacist_id/patient/:patient_id/regime", requesthandlers.AddRegimeItem)
	router.GET("pharmacist/:pharmacist_id/patient/:patient_id/regime", requesthandlers.ViewAllPatientRegime)
	router.GET("pharmacist/:pharmacist_id/patient/:patient_id/regime/:regime_id", requesthandlers.ViewPatientRegime)
	router.PUT("pharmacist/:pharmacist_id/patient/:patient_id/regime/:regime_id", requesthandlers.UpdatePatientRegime)
	router.DELETE("pharmacist/:pharmacist_id/patient/:patient_id/regime/:regime_id", requesthandlers.DeletePatientRegime)
}
