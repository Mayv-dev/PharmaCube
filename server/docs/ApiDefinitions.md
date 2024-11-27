## /user/:id/schedule
### GET: Returns entries for the users schedule.
Request Body
```Json
{}
```

Response Body
```Json
[
	{
		id: 12345,
		day: "Monday", //either days as strings or 0-6 encoded.
		time: "2024-11-23T17:09:15+00:00", //ISO 8061 Datetime with offset
	}
	...
]
```

### POST: Creates a new entry in a users schedule
Request Body
```Json
[
	{
		id: 12345,
		day: "Monday", //either days as strings or 0-6 encoded.
		time: "2024-11-23T17:09:15+00:00", //ISO 8061 Datetime with offset
	}
	...
]
```

Response Body
```Json
{}
```

### PUT: Updates a schedule entry
Request Body
```Json
{
	id: 12345,
	day: 0, //0-6
	time: "2024-11-23T17:09:15+00:00", //ISO 8061 Datetime with offset
}
```

Response Body
```Json
{}
```

### DELETE: Deletes the selected schedule entry
Request Body
```Json
{
	id: 12345,
}
```

Response Body
```Json
{}
```

## /user/:id/regime
### GET: Returns entries for the regime set by the pharmacist
Request Body
```Json
{}
```

Response Body
```Json
[
	{
		id: 0,
		copartment_id: 0, //0-Number of compartments
		information: "info",
		period_scheduled: {
			day:0-6,
			time_period: 0-5, //Time period of day, exact time set by user.
			time_adjustment: +2, //Time adjustment before or after period to take
			instruction: "Take with Food",
		}
	}
]
```

## /user/:id/scheduled_regime
### GET: Returns the users scheduled regime
Combines user set times with the periods set by the pharmacist.
Request Body
```Json
{}
```

Response Body
```Json
[
	{
		id: 0,
		copartment_id: 0, //0-Number of compartments
		time: "2024-11-23T17:09:15+00:00", //ISO 8061 Datetime with offset
	}
]
```

## /user/:id/record
### GET: Returns entries for the users history records
Request Body
```Json
{}
```

Response Body
```Json
{
	id: 0,
	time_scheduled: "2024-11-23T17:09:15+00:00", //ISO 8061 Datetime with offset
	was_taken: true,
	time_taken: "2024-11-23T17:09:15+00:00",
}
```

### POST: Creates a new history record entry
Request Body
```Json
{
	id: 0,
	time_scheduled: "2024-11-23T17:09:15+00:00", //ISO 8061 Datetime with offset
	time_taken: "2024-11-23T17:09:15+00:00",
}
```

Response Body
```Json
{}
```

## /pharmacist/:id/user/:id/regime
### GET: Returns all entries for the users regime
Request Body
```Json
{}
```

Response Body
```Json
{
	id: 0,
	compartment_id: 0,
	period_scheduled: {
		day:0-6,
		time_period: 0-5, //Time period of day, exact time set by user.
		time_adjustment: +2, //Time adjustment before or after period to take
		instruction: "Take with Food",
	}
}
```

### POST: Creates an entry for the users regime
Request Body
```Json
{
	id: 0,
	compartment_id: 0,
	period_scheduled: {
		day:0-6,
		time_period: 0-5, //Time period of day, exact time set by user.
		time_adjustment: +2, //Time adjustment before or after period to take
		instruction: "Take with Food",
	}
}
```

Response Body
```Json
{}
```

### PUT: Updates an entry for the users regime
Request Body
```Json
{
	id: 0,
	compartment_id: 0,
	period_scheduled: {
		day:0-6,
		time_period: 0-5, //Time period of day, exact time set by user.
		time_adjustment: +2, //Time adjustment before or after period to take
		instruction: "Take with Food",
	}
}
```

Response Body
```Json
{}
```

### DELETE: Delets an entry for the users regime
Request Body
```Json
{
	id: 0,
}
```

Response Body
```Json
{}
```
