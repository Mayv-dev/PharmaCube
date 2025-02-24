package apimodels

type MedicationWasTaken struct {
	PatientID         uint `json:"patient_id"`
	ScheduledRegimeID uint `json:"scheduled_regime_id"`
	WasTaken          bool `json:"was_taken"`
}
