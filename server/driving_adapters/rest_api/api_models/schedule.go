package apimodels

import "pharmacube/server/domain"

type PatientSchedule struct {
	Day        domain.Day        `json:"day"`
	Hour       uint              `json:"hour"`
	Minute     uint              `json:"minute"`
	TimePeriod domain.TimePeriod `json:"time_period"`
}
