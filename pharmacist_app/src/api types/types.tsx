import { number, string } from "yup";

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

export type PharmacistAccount = {
    name: string;
    email: string;
    password: string; 
    pharmacy_name: string; 
    pharmacy_address_1: string; 
    pharmacy_address_2: string; 
    pharmacy_address_3: string;  
    postcode: string; 
    patients: any[];
};

export type PharmacistAccountDetailModify = {
    name: string;
    email: string;
    password: string; 
    pharmacy_name: string; 
    pharmacy_address_1: string; 
    pharmacy_address_2: string; 
    pharmacy_address_3: string;  
    postcode: string; 
};

export type PatientAdherenceRecord = {
    patient_id: number;
    information: string;
	date_time_scheduled: string;
	date_time_taken: string;
    was_taken: boolean;
    time_period: number;
}

export type Message = {
	sender_id:number;
	time_sent:string;
	message_body:string;
}

export type Chat = {
	patient_id:number
	pharmacist_id:number
	messages:Message[]
}