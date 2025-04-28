package main

import (
	"log"
	"os"
	"pharmacube/server/domain/models"
	databaseadapters "pharmacube/server/driven_adapters/database_adapters"
	"pharmacube/server/driving_adapters/rest_api/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	if len(os.Args) > 1 && os.Args[1] == "-r" {
		runRelease()

	} else if len(os.Args) > 1 && os.Args[1] == "-d" {
		runDebugTLS()
	} else {
		runDebug()
	}
}

func runDebug() {
	dbSetup()
	server := gin.New()
	serverSetup(server)

	server.Run()
}

func runDebugTLS() {
	dbSetup()
	server := gin.New()
	serverSetup(server)

	server.RunTLS(":8080", "/etc/letsencrypt/live/oro.mayv.dev-0001/fullchain.pem", "/etc/letsencrypt/live/oro.mayv.dev-0001/privkey.pem")
}

func runRelease() {
	dbSetup()
	gin.SetMode(gin.ReleaseMode)
	server := gin.New()
	serverSetup(server)

	server.RunTLS(":8080", "/etc/letsencrypt/live/oro.mayv.dev-0001/fullchain.pem", "/etc/letsencrypt/live/oro.mayv.dev-0001/privkey.pem")
}

func serverSetup(server *gin.Engine) {
	server.Use(gin.Logger(), gin.Recovery())

	log.SetOutput(gin.DefaultWriter)

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	server.Use(cors.New(corsConfig))

	routes.AddPharmacistRoutes(server)
	routes.PatientRoutes(server)
	routes.ChatRoutes(server)
	routes.ResetRoute(server)
}

func dbSetup() {
	dbAdapter := databaseadapters.GromDbAdapter()

	dbAdapter.AutoMigrate(
		&models.Patient{},
		&models.Pharmacist{},
		&models.PatientRegime{},
		&models.PatientSchedule{},
		&models.PatientScheduledRegime{},
		&models.PatientAdherenceRecord{},
		&models.Chat{},
		&models.Message{},
	)
}
