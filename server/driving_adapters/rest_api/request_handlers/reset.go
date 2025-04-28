package requesthandlers

import (
	"io"
	"log"
	"net/http"
	"os"
	"pharmacube/server/driving_adapters/rest_api/responses"

	"github.com/gin-gonic/gin"
)

func HandleReset(context *gin.Context) {
	err := os.Remove("pharmacube.db")
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to reset DB"})
		return
	}

	backupDB, err := os.Open("backup.db")
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to reset DB"})
		return

	}
	defer backupDB.Close()

	newDB, err := os.Create("pharmacube.db")
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to reset DB"})
		return
	}
	defer newDB.Close()

	_, err = io.Copy(newDB, backupDB)
	if err != nil {
		log.Println(err.Error())
		context.JSON(http.StatusInternalServerError, responses.ApiResponse{Data: "Failed to reset DB"})
		return
	}

	context.JSON(http.StatusOK, responses.ApiResponse{Data: "Reset DB"})
}
