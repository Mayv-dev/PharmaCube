package requesthandlers

import (
	"log"
	"net/http"
	"pharmacube/server/driving_adapters/rest_api/responses"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// Notification model
type Notification struct {
	ID        int       `json:"id" validate:"required"`
	Content   string    `json:"content" validate:"required"`
	Timestamp time.Time `json:"timestamp" validate:"required"`
	Urgency   int       `json:"urgency" validate:"required"` // 0 = LOW, 1 = MEDIUM, 2 = HIGH
}

// GET /patient/:patient_id/notifications
func GetPatientNotifications(context *gin.Context) {
	patientId, err := strconv.Atoi(context.Param("patient_id"))
	if err != nil {
		log.Println("Invalid patient ID:", err)
		context.JSON(http.StatusBadRequest, responses.ApiResponse{Data: "Invalid Patient ID"})
		return
	}

	log.Printf("Fetching mock notifications for patient %d\n", patientId)

	// Use a fixed timestamp for mock consistency
	fixedTime, _ := time.Parse(time.RFC3339, "2025-01-06T07:00:19+00:00")

	mockNotifications := []Notification{
		{1, "Take your Wednesday morning medication from compartment 2", fixedTime, 2},
		{2, "Take your Wednesday morning medication from compartment 2", fixedTime, 1},
		{3, "Take your Wednesday morning medication from compartment 2", fixedTime, 2},
		{4, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{5, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{6, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{7, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{8, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{9, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{10, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{11, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{12, "Take your Wednesday morning medication from compartment 2", fixedTime, 1},
		{13, "Take your Wednesday morning medication from compartment 2", fixedTime, 2},
		{14, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{15, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{16, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{17, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{18, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
		{19, "Take your Wednesday morning medication from compartment 2", fixedTime, 0},
	}

	context.JSON(http.StatusOK, responses.ApiResponse{Data: mockNotifications})
}
