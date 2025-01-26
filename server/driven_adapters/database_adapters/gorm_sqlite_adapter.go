package databaseadapters

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GromDbAdapter() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("pharmacube.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to db")
	}

	return db
}
