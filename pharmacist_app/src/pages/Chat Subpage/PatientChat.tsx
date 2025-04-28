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
	passedPharmacistId:number
	passedPharmacistDetails:any
}

const PatientChat: React.FC<PatientChatProps> =  ({passedPharmacistDetails, passedPharmacistId, passedPatientChatStatus, passedPatientId}) => {
	const [patientChat, setPatientChat] = useState<any[]>([]);
	const [pollSwitch, setPollSwitch] = useState<boolean>(false);
	const [chatNotCreated, setChatNotCreated] = useState<boolean>(false);
	const [chatNotCreatedLock, setChatNotCreatedLock] = useState<boolean>(false);

	useEffect(() => {
		
		if(!chatNotCreated && !chatNotCreatedLock && passedPharmacistDetails?.chats.find(chat => chat.id == passedPatientId) == undefined) {
			setChatNotCreatedLock(true)
			axios.post(`${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/chat/${passedPharmacistId}/${passedPatientId}`)
		}
	},[chatNotCreated])

	// Code for setTimeout found at w3schools.com: https://www.w3schools.com/react/react_useeffect.asp
	useEffect(()=> {
			// I need to loop through the chats of the pharmacist to see if one has the patient in question
			let matchedChat = passedPharmacistDetails.chats.find(chat => chat.patient_id == passedPatientId)
			matchedChat != undefined ? getPatientChat(matchedChat.id).then(res => {res != "Request failed with status code 500" ? setPatientChat(res) : console.log("500 error")})
			: setChatNotCreated(true)
			setTimeout(()=> {
				setPollSwitch(!pollSwitch)
			},15000)
		}
	,[passedPatientId,pollSwitch,]) 


	const getPatientChat = async (chat_id:number) => {
		try {
			const { data, status } = await axios.get(
			  `${import.meta.env.VITE_SERVER_PROTOCOL}://${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}/chat/${passedPharmacistId}/${chat_id}`,
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
		let matchedChat = passedPharmacistDetails.chats.find(chat => chat.patient_id == passedPatientId)
		console.log(matchedChat)
		if (matchedChat == undefined) return
		const sentMessage:Message = {
			time_sent:new Date(Date.now()).toISOString(),
			chat_id:matchedChat.id,
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
			).then(res => getPatientChat(passedPatientId).then(setPatientChat));
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
					{ patientChat.map(message => <ChatBubble passedPharmacistId={passedPharmacistId} passedPatientId={passedPatientId} passedMessage={message}></ChatBubble>)}
				</div>
				<ChatTextbox messageSent={messageSent}></ChatTextbox>
			</div>
				</IonContent>
		</IonPage>
	);
};

export default PatientChat;
