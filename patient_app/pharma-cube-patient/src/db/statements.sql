CREATE TABLE schedule (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	day INTEGER NOT NULL,
	-- Apparently there is no date type in SQLite, so text was recommended
	time TEXT NOT NULL
)

INSERT INTO SCHEDULE(day, time)
-- Might be a good idea to change to UTC timestamp later
VALUES (0,"2024-12-10 17:00:00.000")

DROP table schedule