import { SQLiteDBConnection } from "@capacitor-community/sqlite";

export function getLocalSchedule(performSQLAction:any,day:number|null) {
	let schedules;
	performSQLAction(async (db: SQLiteDBConnection | undefined) => {
		const result = await db?.query("SELECT id, day, time, timeofday FROM schedule WHERE day = ?", [day]);
		schedules = result?.values;
	});
	return schedules;
}

export function createLocalScheduleItem(performSQLAction:any,selectedTimeOfDay:number|null,selectedDay:number|null,formattedTime:number|null) {
	try {
		performSQLAction(async (db: SQLiteDBConnection | undefined) => {
		const repeatingTime = await db?.query("SELECT COUNT(*) FROM schedule WHERE timeofday = ? AND day = ?;", [selectedTimeOfDay, selectedDay]);
		console.log(repeatingTime?.values?.at(0)["COUNT(*)"])
		if(repeatingTime?.values?.at(0)["COUNT(*)"] > 0) {
			alert("This time of day already exists");
			return;
		}
		else {
			await db?.query("INSERT INTO schedule (day, time, timeofday) VALUES (?, ?, ?);", [selectedDay, formattedTime, selectedTimeOfDay]);
			const generatedId = await db?.query("SELECT id FROM schedule WHERE day = ? AND time = ? AND timeOfDay = ?", [selectedDay, formattedTime, selectedTimeOfDay]);
			const newId:number = typeof generatedId?.values?.at(0).id == "number" ? generatedId?.values?.at(0).id : 0
			console.log("Inserting ", { id: newId, day:selectedDay, time: formattedTime })
		}
		});
	} catch (error) {
		alert((error as Error).message);
	}
}

export function deleteLocalScheduleItem(performSQLAction:any,id:number|null) {
	let schedules;
	try {
		performSQLAction(async (db: SQLiteDBConnection | undefined) => {
		  await db?.query("DELETE FROM schedule WHERE id = ?", [id]);
		  //setSchedule((prev) => prev.filter((item) => item.id !== id));
		});
	  } catch (error) {
		alert((error as Error).message);
	  }
	return schedules;
}


export function modifyLocalScheduleItem(performSQLAction:any,selectedDay:number|null,formattedTime:number|null,originalTime:number|null) {
	let schedules;
	try {
		performSQLAction(async (db: SQLiteDBConnection | undefined) => {
		  await db?.query("UPDATE schedule SET time = ? WHERE day = ? AND time = ?", [formattedTime, selectedDay, originalTime]);
		  const generatedId = await db?.query("SELECT id FROM schedule WHERE day = ? AND time = ?", [selectedDay, formattedTime]);
		  const newId:number = typeof generatedId?.values?.at(0).id == "number" ? generatedId?.values?.at(0).id : 0
		  console.log("Updating ", { id: newId, day:selectedDay, time: formattedTime })
		  if(typeof selectedDay == "number") {
			// setSchedule((prev) =>
			//   prev.map((item) => (item.time === originalTime ? { id:newId, day: selectedDay, time: formattedTime , timeofday:item.timeofday} : item))
			// );
		}
		});
	  } catch (error) {
		alert((error as Error).message);
	  }
	return schedules;
}