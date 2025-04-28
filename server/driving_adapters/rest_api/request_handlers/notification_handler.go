package requesthandlers

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"pharmacube/server/driving_adapters/rest_api/responses"

	"github.com/gin-gonic/gin"
)

// Notification model (can be moved to api_models)
type Notification struct {
	ID        int       `json:"id"`
	Content   string    `json:"content"`
	Timestamp time.Time `json:"timestamp"`
	Urgency   int       `json:"urgency"` // 0 = LOW, 1 = MEDIUM, 2 = HIGH
}

// GET /patient/:patient_id/notifications
func GetPatientNotifications(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println("Invalid patient ID:", err)
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	//  fixing error in the code
	log.Printf("Generating mock notifications for patient ID: %d\n", patientId)

	timestamp, _ := time.Parse(time.RFC3339, "2025-01-06T07:00:19+00:00")

	mockNotifications := []Notification{
		{1, "Take your Wednesday morning medication from compartment 2", timestamp, 2},
		{2, "Time for your blood pressure meds in compartment 1", timestamp, 1},
		{3, "Don’t forget your antibiotic dose in compartment 3", timestamp, 2},
		{4, "Take your evening medication from compartment 2", timestamp, 0},
		{5, "Morning pain relief – compartment 4", timestamp, 0},
		{6, "Take your cholesterol medication from compartment 1", timestamp, 0},
		{7, "Take your diabetes medication from compartment 2", timestamp, 0},
		{8, "Evening vitamin D supplement in compartment 5", timestamp, 0},
		{9, "Take your antacid tablet from compartment 3", timestamp, 0},
		{10, "Take your anxiety medication before bed", timestamp, 0},
		{11, "Compartment 6: Allergy medication reminder", timestamp, 0},
		{12, "Urgent: Take your heart medication now", timestamp, 1},
		{13, "High alert: Blood thinner in compartment 2", timestamp, 2},
		{14, "Routine vitamin B12 dose", timestamp, 0},
		{15, "Low dose aspirin in compartment 4", timestamp, 0},
		{16, "Midday meds – check compartment 3", timestamp, 0},
		{17, "Take your immune booster today", timestamp, 0},
		{18, "Evening dose for inflammation – compartment 2", timestamp, 0},
		{19, "Important: Take your thyroid medication", timestamp, 0},
	}
	

	context.JSON(http.StatusOK, mockNotifications)
}
