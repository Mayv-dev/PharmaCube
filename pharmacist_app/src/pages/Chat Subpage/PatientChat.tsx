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

	const [patientId, setPatientId] = useState<number>(1);
	const [patientName, setPatientName] = useState('Unselected');
	const [patientChat, setPatientChat] = useState<Chat>();

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
				{ patientChat?.messages.map(message => <ChatBubble passedMessage={message.message_body} passedDateTimeOfMessage={message.time_sent}></ChatBubble>)}
				<ChatBubble passedMessage='Test chat bubble. Left align if patient, right align if pharmacist.' passedDateTimeOfMessage='2025-03-17T15:40:57+00:00'></ChatBubble>
				<div className='chatColumn'>
					<div className='chatRow'>
						<div className='chatQuestion'>Can I drink alcohol while on sertraline?</div>
						<div className='chatAnswer'>I would advise against it. It is not advised to drink alcohol while on sertraline.</div>
					</div>
					<div className='chatRow'>
						<div className='chatQuestion'>I have been getting a rash since I've started on Keppra. Should I stop?</div>
						{answered ? 
							<div className='chatAnswer'>If the rash is very irritating, it may be best to try alternative anti-seizure medications. You should contact your GP and ask about alternatives.</div>
							:
							<IonButton onClick={e => setAnswered(true)} className='chatAnswerButton'>Answer</IonButton>
						}
					</div>
				</div>
				<ChatTextbox messageSent={messageSent}></ChatTextbox>
			</div>
				</IonContent>
		</IonPage>
	);
};

export default PatientChat;
