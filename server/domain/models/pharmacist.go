package models

type Pharmacist struct {
	Name     string    `json:"name"`
	Patients []Patient `json:"patients"`
}
