package main

import (
	"log"
	"pharmacube/server/domain/models"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"pharmacube/server/driving_adapters/rest_api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var DbAdapter *gorm.DB

func main() {
	DbAdapter = databaseadapters.GromDbAdapter()

	DbAdapter.AutoMigrate(
		&models.Patient{},
		&models.Pharmacist{},
		&models.PatientRegime{},
		&models.PatientSchedule{},
		&models.PatientScheduledRegime{},
		&models.PatientAdherenceRecord{},
	)

	//mockdata()

	server := gin.Default()

	log.SetOutput(gin.DefaultWriter)

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	server.Use(cors.New(corsConfig))

	routes.AddPharmacistRoutes(server)
	routes.PatientRoutes(server)
	routes.ChatRoutes(server)

	server.Run()
}

func mockdata() {
	patient := models.Patient{
		Name:             "TestPatient",
		ScheduleTimes:    []models.PatientSchedule{},
		ScheduledRegimes: []models.PatientScheduledRegime{},
		AdherenceRecord:  []models.PatientAdherenceRecord{},
	}

	pharmacist := models.Pharmacist{
		Name:     "TestPharmacy",
		Patients: []models.Patient{patient},
	}

	result := DbAdapter.Create(&pharmacist)
	if result.Error != nil {
		log.Println(result.Error.Error())
	}
}
