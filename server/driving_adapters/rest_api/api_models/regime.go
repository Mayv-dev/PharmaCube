package apimodels

import "pharmacube/server/domain"

type Regime struct {
	CompartmentID int               `json:"compartment_id"`
	Information   string            `json:"information"`
	Day           domain.Day        `json:"day"`
	TimePeriod    domain.TimePeriod `json:"time_period"`
	TimeOffset    int               `json:"time_adjustment"`
	Instruction   string            `json:"instruction"`
}
