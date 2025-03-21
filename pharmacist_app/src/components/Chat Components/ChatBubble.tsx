import { TextToSpeech } from '@capacitor-community/text-to-speech';
import {
	IonButton,
	IonIcon,
	IonLabel,
	IonTabBar,
	IonTabButton
} from '@ionic/react';
import { Message } from 'api types/types';
import { musicalNotes } from 'ionicons/icons';
import { useEffect, useState } from 'react';

import "../../styles/ChatBubble.css"

type ChatBubbleProps = {
	passedMessage:Message;
	passedPharmacistId:number;
	passedPatientId:number;
}



const ChatBubble: React.FC<ChatBubbleProps> = ({passedMessage, passedPharmacistId ,passedPatientId}) => {
	const [message, setMessage] = useState<string>("")
	const [datetimeOfMessage, setDatetimeOfMessage] = useState<string>("")

	useEffect(() =>{
			setMessage(passedMessage.message_body);
			setDatetimeOfMessage(passedMessage.time_sent);
		}
		,[passedMessage]
	)

	const speak = async () => {
		await TextToSpeech.speak({
		  text: message,
		  lang: 'en-US',
		  rate: 1.0,
		  pitch: 1.0,
		  volume: 1.0,
		  category: 'ambient',
		  queueStrategy: 1
		});
	  };

	return (
		<div className={passedMessage.sender_id == passedPharmacistId ? "pharmacistBubble":"patientBubble"}>
			{
				passedMessage.sender_id == passedPharmacistId ? null : <div className='bubbleMisc'>
					<IonButton onClick={() => speak()}>
						<IonIcon icon={musicalNotes}></IonIcon>
					</IonButton>
					<p className='bubbleTimestamp'>{""+datetimeOfMessage.substring(0,4)+"/"+datetimeOfMessage.substring(5,7)+"/"+datetimeOfMessage.substring(8,10)+" "+datetimeOfMessage.substring(11,16)}</p>
				</div>
			}
			<p className='bubbleMessage'>{message}</p>
			{
				passedMessage.sender_id != passedPharmacistId ? null : <div className='bubbleMisc'>
					<IonButton onClick={() => speak()}>
						<IonIcon icon={musicalNotes}></IonIcon>
					</IonButton>
					<p className='bubbleTimestamp'>{datetimeOfMessage.substring(0,4)+"/"+datetimeOfMessage.substring(5,7)+"/"+datetimeOfMessage.substring(8,10)}</p>
					<p className='bubbleTimestamp'>{datetimeOfMessage.substring(11,16)}</p>
				</div>
			}
			
		</div>
	);
};

export default ChatBubble;
