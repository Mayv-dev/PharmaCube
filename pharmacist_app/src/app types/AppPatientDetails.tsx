import { Message } from "api types/types"

export type AppPatientDetails = {
	patient_id:number, // lets say 2 patients for now. 
	// This is compared to for the patient id each chat coming in. 
	// we take the chat coming in, and map the patients of our patient list to see if 
	// a match exists, in case of the other way around having hundreds of patients compared to a pharmacist's 5-6

	patient_img:string, // destination for their default profile pic, stored in a public/profile/profile# folder

	patient_name:string, // id1 = Ann Murphy, id2 = Obi Njoku, could also be stored in a public/profile/profile# folder

	patient_chat:Message[], // This is compared to for any differences with a message list when our patient_id matches the patient_id the incoming chats
	
	patient_has_received_first_batch:boolean // With this, we don't get notified as soon as we are hit with the first messages
}

export default AppPatientDetails