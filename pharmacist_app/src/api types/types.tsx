export type RegimeItem = {
	id: number;
	copartment_id: number; 
	information: string;
	period_scheduled: {
		day:number;
		time_period:number; //Time period of day, exact time set by user.
		time_adjustment:number; //Time adjustment before or after period to take
		instruction:string;
	}
};