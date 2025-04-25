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

	mockNotifications := []Notification{
		{1, "Take your Wednesday morning medication from compartment 2", time.Date(2025, 1, 6, 12, 3, 0, 0, time.UTC), 2},
		{2, "Time for your blood pressure meds in compartment 1", time.Date(2025, 1, 6, 19, 51, 0, 0, time.UTC), 1},
		{3, "Don’t forget your antibiotic dose in compartment 3", time.Date(2025, 1, 7, 7, 32, 0, 0, time.UTC), 2},
		{4, "Take your evening medication from compartment 2", time.Date(2025, 1, 7, 14, 2, 0, 0, time.UTC), 0},
		{5, "Morning pain relief – compartment 4", time.Date(2025, 1, 8, 22, 40, 0, 0, time.UTC), 0},
		{6, "Take your cholesterol medication from compartment 1", time.Date(2025, 1, 9, 10, 24, 0, 0, time.UTC), 0},
		{7, "Take your diabetes medication from compartment 2", time.Date(2025, 1, 9, 13, 10, 0, 0, time.UTC), 0},
		{8, "Evening vitamin D supplement in compartment 5", time.Date(2025, 1, 9, 16, 12, 0, 0, time.UTC), 0},
		{9, "Take your antacid tablet from compartment 3", time.Date(2025, 1, 9, 19, 5, 0, 0, time.UTC), 0},
		{10, "Take your anxiety medication before bed", time.Date(2025, 1, 10, 12, 14, 0, 0, time.UTC), 0},
		{11, "Compartment 6: Allergy medication reminder", time.Date(2025, 1, 11, 15, 5, 0, 0, time.UTC), 0},
		{12, "Urgent: Take your heart medication now", time.Date(2025, 1, 11, 15, 53, 0, 0, time.UTC), 1},
		{13, "High alert: Blood thinner in compartment 2", time.Date(2025, 1, 11, 16, 55, 0, 0, time.UTC), 2},
		{14, "Routine vitamin B12 dose", time.Date(2025, 1, 11, 17, 21, 0, 0, time.UTC), 0},
		{15, "Low dose aspirin in compartment 4", time.Date(2025, 1, 12, 11, 21, 0, 0, time.UTC), 0},
		{16, "Midday meds – check compartment 3", time.Date(2025, 1, 12, 11, 27, 0, 0, time.UTC), 0},
		{17, "Take your immune booster today", time.Date(2025, 1, 12, 11, 36, 0, 0, time.UTC), 0},
		{18, "Evening dose for inflammation – compartment 2", time.Date(2025, 1, 12, 11, 56, 0, 0, time.UTC), 0},
		{19, "Important: Take your thyroid medication", time.Date(2025, 1, 12, 12, 4, 0, 0, time.UTC), 0},
	}
	

	

	context.JSON(http.StatusOK, mockNotifications)
}
