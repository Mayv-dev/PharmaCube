package models

type PatientRegime struct {
	Common
	PatientID             uint   `json:"patient_id"`
	PharmacistID          uint   `json:"pharmacist_id"`
	MedicationInformation string `json:"information"`
	Day                   int    `json:"day"`
	TimePeriod            int    `json:"time_period"`
	TimeOffset            int    `json:"time_adjustment"`
	Instructions          string `json:"instructions"`
	CompartmentID         uint   `json:"compartment_id"`
}
