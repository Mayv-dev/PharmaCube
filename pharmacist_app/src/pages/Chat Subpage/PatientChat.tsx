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

// type ContainerProps = {
// 	passModifyDataToApp:any
// }

const PatientChat: React.FC =  () => {
	const [pharmacistId, setPharmacistId] = useState<number>(1);

	const [patientId, setPatientId] = useState<number>(1);
	const [patientName, setPatientName] = useState('Unselected');
	const [patientChat, setPatientChat] = useState<Chat>();
	const [count, setCount] = useState(0)

	const [answered, setAnswered] = useState(false);

	useEffect(()=> {
		getPatientChat().then(res => res == "Network Error" ? null:setPatientChat(res))
		setTimeout(() => {
			setCount((count) => count + 1);
		  }, 5000);
	},[count])

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

	const messageSent = (message:string) => {
		console.log(message)
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
