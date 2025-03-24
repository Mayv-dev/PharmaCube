package models

type Patient struct {
	Common
	Name             string                   `json:"name"`
	ScheduleTimes    []PatientSchedule        `json:"schedule_times"`
	ScheduledRegimes []PatientScheduledRegime `json:"scheduled_regimes"`
	AdherenceRecord  []PatientAdherenceRecord `json:"adherence_record"`
	PharmacistID     uint                     `json:"pharmacist_id"`
	Chats            []Chat                   `json:"chats"`
}
