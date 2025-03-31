package models

type PatientSchedule struct {
	Common
	PatientID  uint `json:"patient_id"`
	Day        uint `json:"day"`
	Hour       uint `json:"hour"`
	Minute     uint `json:"minute"`
	TimePeriod uint `json:"time_period"`
}
