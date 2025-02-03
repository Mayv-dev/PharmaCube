package models

type Pharmacist struct {
	Common
	Name     string    `json:"name"`
	Patients []Patient `json:"patients"`
}
