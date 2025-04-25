import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonPage,
  IonContent,
  IonButton,
} from '@ionic/react';
import '../../styles/Chat Subpage/PatientChat.css';
import { ChatType } from 'api types/types';
import ChatBubble from '../../components/Chat Components/ChatBubble';
import ChatTextbox from '../../components/Chat Components/ChatTextbox';

import { Message } from 'api types/types';

type PatientChatProps = {
	passedPatientChatStatus:boolean
	passedPatientId:any
}

const PatientChat: React.FC<PatientChatProps> =  ({passedPatientChatStatus, passedPatientId}) => {
	const [pharmacistId, setPharmacistId] = useState<number>(1);

	const [patientChat, setPatientChat] = useState<any[]>([]);
	const [pollSwitch, setPollSwitch] = useState<boolean>(false);


	// Code for setTimeout found at w3schools.com: https://www.w3schools.com/react/react_useeffect.asp
	useEffect(()=> {
		let res = getPatientChat().then(res => {
				if(res == "Network Error") alert("Network error occured. Are you connected to the internet?")
				else if(res == "Request failed with status code 500") {
					axios.post(`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/chat/1/${passedPatientId}`)
				}
				else {
					setPatientChat(res)
				}
			}
		)
		setTimeout(()=> {
			setPollSwitch(!pollSwitch);
		},1000)
	},[passedPatientId,pollSwitch,])

	const getPatientChat = async () => {
		try {
			const { data, status } = await axios.get(
			  `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/chat/1/${passedPatientId}`,
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
			chat_id:passedPatientId,
			is_sender_patient:false,
			message_body:message
		}
		try {
			console.log("post request being made...")
			const { data, status } = await axios.post(
				`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/chat`,
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
				<div className='patientChatTopSection'>
					<IonButton expand="block" routerLink='/chat' routerDirection='root' className='ScheduleButtons' color="light">
						Back to Chat Menu
					</IonButton>
				<p>Selected patient: {passedPatientId}</p>
				</div>
				<div className={"chatBubbleContainer"}>
					{ patientChat?.map(message => <ChatBubble passedPharmacistId={pharmacistId} passedPatientId={passedPatientId} passedMessage={message}></ChatBubble>)}
				</div>
				<ChatTextbox messageSent={messageSent}></ChatTextbox>
			</div>
				</IonContent>
		</IonPage>
	);
};

export default PatientChat;
