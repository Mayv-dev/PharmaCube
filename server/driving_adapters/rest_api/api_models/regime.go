package apimodels

type Regime struct {
	CompartmentID int    `json:"compartment_id"`
	Information   string `json:"information"`
	Day           uint   `json:"day"`
	TimePeriod    uint   `json:"time_period"`
	TimeOffset    int    `json:"time_adjustment"`
	Instruction   string `json:"instruction"`
}
