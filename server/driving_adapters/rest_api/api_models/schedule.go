package apimodels

type PatientSchedule struct {
	Day        uint `json:"day"`
	Hour       uint `json:"hour"`
	Minute     uint `json:"minute"`
	TimePeriod uint `json:"time_period"`
}
