import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonPage,
  IonContent,
  IonButton,
} from '@ionic/react';
import '../../styles/Chat Subpage/PatientChat.css';
import { Chat } from 'api types/types';
import ChatBubble from '../../components/Chat Components/ChatBubble';
import ChatTextbox from '../../components/Chat Components/ChatTextbox';

import { Message } from 'api types/types';

type PatientChatProps = {
	passedPatientChatStatus:boolean
	passedPatient:any
}

const PatientChat: React.FC<PatientChatProps> =  ({passedPatientChatStatus, passedPatient}) => {
	const [pharmacistId, setPharmacistId] = useState<number>(1);

	const [patientId, setPatientId] = useState<number>(passedPatient);
	const [patientChat, setPatientChat] = useState<Chat>({patient_id:passedPatient, pharmacist_id:1, messages:[]});

	// Code for setTimeout found at w3schools.com: https://www.w3schools.com/react/react_useeffect.asp
	useEffect(()=> {
		getPatientChat().then(res => res == "Network Error" || res == "Request failed with status code 404" ? console.log("Server connection has failed in PatientApp.tsx with the following error message: ", res):setPatientChat({patient_id:patientId, pharmacist_id:pharmacistId, messages:res}))	
	},[passedPatientChatStatus, passedPatient])

	const getPatientChat = async () => {
		try {
			const { data, status } = await axios.get(
			  `http://localhost:8080/chat/1/${passedPatient}`,
			  {
				headers: {
				  Accept: 'application/json'
				},
			  },
			);
			return data;
	  
		  } catch (error) {
			if (axios.isAxiosError(error)) {
			  console.log('error message: ', error.message);
			  return error.message;
			} else {
			  console.log('unexpected error: ', error);
			  return 'An unexpected error occurred';
			}
		  }
	}

	const messageSent = async (message:string) => {
		const sentMessage:Message = {
			time_sent:new Date(Date.now()).toISOString(),
			chat_id:passedPatient,
			is_sender_patient:false,
			message_body:message
		}
		try {
			console.log("post request being made...")
			const { data, status } = await axios.post(
				`http://localhost:8080/chat`,
				sentMessage,
				{
					headers: {
						Accept: 'application/json'
					},
				},
			);
			let updatedPatientChat = patientChat.messages
			updatedPatientChat.push(sentMessage)
			setPatientChat({patient_id:patientId, pharmacist_id:pharmacistId, messages:updatedPatientChat})
			return data;
		}
		catch (error) {
			if (axios.isAxiosError(error)) {
				console.log('error message: ', error.message);
				return error.message;
			} else {
				console.log('unexpected error: ', error);
				return 'An unexpected error occurred';
			}
		}
	}

	return (
		<IonPage>
			<IonContent className="ion-padding">
			<div className='webBody'>
				<div className='patientChatTopSection'>
					<IonButton expand="block" routerLink='/chat' routerDirection='root' className='ScheduleButtons' color="light">
						Back to Chat Menu
					</IonButton>
				<p>Selected patient: {passedPatient}</p>
				</div>
				<div className={"chatBubbleContainer"}>
					{ patientChat.messages?.map(message => <ChatBubble passedPharmacistId={pharmacistId} passedPatientId={patientId} passedMessage={message}></ChatBubble>)}
				</div>
				<ChatTextbox messageSent={messageSent}></ChatTextbox>
			</div>
				</IonContent>
		</IonPage>
	);
};

export default PatientChat;
