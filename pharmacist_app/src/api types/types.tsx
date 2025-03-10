export type RegimeItem = {
    id: number;
    compartment_id: number; 
    information: string;
    date:number;
    month:number;
    year:number;
    time_period:number; //Time period of day, exact time set by user.
    time_adjustment:number; //Time adjustment before or after period to take
    instructions:string;
};