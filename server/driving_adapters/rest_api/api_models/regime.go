package apimodels

type Regime struct {
	CompartmentID int    `json:"compartment_id"`
	Information   string `json:"information"`
	Date          uint   `json:"date"`
	Month         uint   `json:"month"`
	Year          uint   `json:"year"`
	TimePeriod    uint   `json:"time_period"`
	TimeOffset    int    `json:"time_adjustment"`
	Instructions  string `json:"instructions"`
}
