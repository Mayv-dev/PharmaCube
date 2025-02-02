package models

import "pharmacube/server/domain"

type PatientSchedule struct {
	Common
	PatientID  uint              `json:"patient_id"`
	Day        domain.Day        `json:"day"`
	Hour       uint              `json:"hour"`
	Minute     uint              `json:"minute"`
	TimePeriod domain.TimePeriod `json:"time_period"`
}
