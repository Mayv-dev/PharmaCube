package domain

type TimePeriod uint

const (
	UndefinedTimePeriod TimePeriod = iota
	Morning
	Midday
	Afternoon
	Evening
	Night
)
