# Oro Server

## Requirements
- Go version 1.22 or higher.
- Sqlite version 3.46 or higher.

- **Windows**
    - [tdm-gcc, Windows GCC compiler](https://jmeubank.github.io/tdm-gcc/download/)

## Setup Instructions
- Create a file pharmacube.db for the database.
- Optional: To use the reset function a separate database file is needed, backup.db
- `go build`

## Running the Server
- For localhost using HTTP with Debug mode
    - `./server`
- For hosted version using HTTPS with Debug mode
    - `./server -d`
- For hosted version using HTTPS with Release mode
    - `./server -r`
