package requesthandlers

import "github.com/gin-gonic/gin"

func GetPatient(context *gin.Context) {
	patientId := context.Param("id")

}
