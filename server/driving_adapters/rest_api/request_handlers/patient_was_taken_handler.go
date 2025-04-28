package requesthandlers

import (
	"log"
	"net/http"
	"pharmacube/server/domain/models"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	apimodels "pharmacube/server/driving_adapters/rest_api/api_models"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func UpdateWasTaken(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		//Invalid ID
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	var wasTakenUpdate apimodels.MedicationWasTaken
	err = context.BindJSON(&wasTakenUpdate)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Request Body"})
		return
	}

	scheduledRegime, err := databaseadapters.GetPatientScheduledRegimeItem(uint(patientId), uint(wasTakenUpdate.ScheduledRegimeID))
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusNotFound, responses.ApiResponse{Data: "Scheduled Regime Item not found"})
	}

	wasTaken := models.PatientAdherenceRecord{
		PatientID:             uint(patientId),
		MedicationInformation: scheduledRegime.Information,
		DateTimeScheduled:     scheduledRegime.DateTimeToTake,
		DateTimeTaken:         time.Now(),
		WasTaken:              wasTakenUpdate.WasTaken,
		TimePeriod:            scheduledRegime.TimePeriod,
	}

	err = databaseadapters.UpdatePatientTaken(uint(patientId), scheduledRegime, wasTaken)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Error Updating for Medication taken"})
		return
	}

	context.JSON(http.StatusOK, nil)
}
