package models

type Pharmacist struct {
	Common
	Name             string    `json:"name"`
	Email            string    `json:"email"`
	Password         string    `json:"password"`
	PharmacyName     string    `json:"pharmacy_name"`
	PharmacyAddress1 string    `json:"pharmacy_address_1"`
	PharmacyAddress2 string    `json:"pharmacy_address_2"`
	PharmacyAddress3 string    `json:"pharmacy_address_3"`
	PharmacyPostCode string    `json:"postcode"`
	Patients         []Patient `json:"patients"`
	Chats            []Chat    `json:"chats"`
}
