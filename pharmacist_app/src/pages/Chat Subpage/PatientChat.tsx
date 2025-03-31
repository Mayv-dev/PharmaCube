import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonRouterLink,
} from '@ionic/react';
import '../../styles/Chat Subpage/PatientChat.css';
import LowerToolbar from '../../components/LowerToolbar';
import { Chat, RegimeItem } from 'api types/types';
import RegimeItemContainer from '../../components/Regime Components/RegimeItemContainer';
import ChatBubble from '../../components/Chat Components/ChatBubble';
import ChatTextbox from '../../components/Chat Components/ChatTextbox';

import { Message } from 'api types/types';

type PatientChatProps = {
	passedPatientChatStatus:boolean
}

const PatientChat: React.FC<PatientChatProps> =  ({passedPatientChatStatus}) => {
	const [pharmacistId, setPharmacistId] = useState<number>(1);

	const [patientId, setPatientId] = useState<number>(2);
	const [patientName, setPatientName] = useState('Ann Murphy');
	const [patientChat, setPatientChat] = useState<Chat>({patient_id:2, pharmacist_id:1, messages:[{sender_id:2,time_sent:"2025-03-17T15:40:57+00:00",message_body:"Are you my new pharmacist?"}, {sender_id:1,time_sent:"2025-03-17T15:40:57+00:00",message_body:"Yes, how can I help you?"}]});

	const [answered, setAnswered] = useState(false);

	// Code for setTimeout found at w3schools.com: https://www.w3schools.com/react/react_useeffect.asp
	useEffect(()=> {
		getPatientChat().then(res => res == "Network Error" || res == "Request failed with status code 404" ? console.log("Server connection has failed in PatientApp.tsx with the following error message: ", res):setPatientChat(res))	
	},[passedPatientChatStatus])

	const getPatientChat = async () => {
		try {
			const { data, status } = await axios.get(
			  `http://localhost:8080/pharmacist/${pharmacistId}/patient/${patientId}/chat`,
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
		try {
			const sentMessage:Message = {
				sender_id:pharmacistId,
				time_sent:new Date(Date.now()).toISOString(),
				message_body:message
			}
			console.log("post request being made...")
			const { data, status } = await axios.post(
				`http://demo3553220.mockable.io/pharmacist/pharmacist_id/patient/patient_id/chat`,
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
				<IonRouterLink routerLink='/chat'>
					<IonButton expand="block" className='ScheduleButtons' color="light">
						Back to Chat Menu
					</IonButton>
				</IonRouterLink>
				<p>Selected patient: {patientName}</p>
				{ patientChat?.messages.map(message => <ChatBubble passedPharmacistId={pharmacistId} passedPatientId={patientId} passedMessage={message}></ChatBubble>)}
				<ChatTextbox messageSent={messageSent}></ChatTextbox>
			</div>
				</IonContent>
		</IonPage>
	);
};

export default PatientChat;
