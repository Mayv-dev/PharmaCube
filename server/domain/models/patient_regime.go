package models

type PatientRegime struct {
	Common
	PatientID             uint   `json:"patient_id"`
	PharmacistID          uint   `json:"pharmacist_id"`
	MedicationInformation string `json:"information"`
	Date                  int    `json:"date"`
	Month                 int    `json:"month"`
	Year                  int    `json:"year"`
	TimePeriod            int    `json:"time_period"`
	TimeOffset            int    `json:"time_adjustment"`
	Instructions          string `json:"instructions"`
	CompartmentID         uint   `json:"compartment_id"`
}
