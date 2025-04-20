import { TextToSpeech } from '@capacitor-community/text-to-speech';
import {
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonModal,
	IonText,
	IonTitle
} from '@ionic/react';
import { Message } from 'api types/types';
import { ellipsisVerticalCircle, musicalNotes } from 'ionicons/icons';
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
	const [showModal, setShowModal] = useState(false);

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
		<>
		<div className={passedMessage.is_sender_patient ? "patientBubble":"pharmacistBubble"}>
			{
				passedMessage.is_sender_patient ? <div className='bubbleMisc'>
				<p className='bubbleTimestamp'>{datetimeOfMessage.substring(0,4)+"/"+datetimeOfMessage.substring(5,7)+"/"+datetimeOfMessage.substring(8,10)}</p>
				<p className='bubbleTimestamp'>{datetimeOfMessage.substring(11,16)}</p>
			</div> : <IonIcon className={"bubbleMiscIcon"} onClick={() => setShowModal(true)} icon={ellipsisVerticalCircle}></IonIcon>
			}
			<p className='bubbleMessage'>{message}</p>
			{
				passedMessage.is_sender_patient ? 
				<IonIcon className={"bubbleMiscIcon"} onClick={() => setShowModal(true)} icon={ellipsisVerticalCircle}></IonIcon>
			 : <div className='bubbleMisc'>
					<p className='bubbleTimestamp'>{datetimeOfMessage.substring(0,4)+"/"+datetimeOfMessage.substring(5,7)+"/"+datetimeOfMessage.substring(8,10)}</p>
					<p className='bubbleTimestamp'>{datetimeOfMessage.substring(11,16)}</p>
				</div>
			}
			
		</div>
		<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
		<IonButton expand="full" color="medium" className="cancel-button" onClick={() => setShowModal(false)}>
			Close
		</IonButton>
		<IonHeader>
			<IonTitle>{passedMessage.is_sender_patient ? "Patient: ":"You: "} {passedMessage.message_body}</IonTitle>
		</IonHeader>
		<IonContent className="ion-padding">
			<IonButton onClick={() => speak()}>
				<IonText>Read Out Loud </IonText>
				<IonIcon icon={musicalNotes}></IonIcon>
			</IonButton>
		</IonContent>
	</IonModal>
	</>
	);
};

export default ChatBubble;
