import {
	IonButton,
	IonIcon,
	IonItem,
	IonTextarea
} from '@ionic/react';
import { send } from 'ionicons/icons';
import { useState } from 'react';

{/* Documentation for profanity library found at https://www.npmjs.com/package/@2toad/profanity */}
import { profanity } from '@2toad/profanity';
import "../../styles/Chat Subpage/PatientChat.css"
type ChatTextboxProps = {
	messageSent:any; // could use this to send the go-ahead to update the state above (e.g. the new chat bubble from your message)
}


const ChatTextbox: React.FC<ChatTextboxProps> = ({messageSent}) => {
	const [messageToSend, setMessageToSend] = useState<string>("");

	const processMessage = () => {
		if (messageToSend.length == 0 || profanity.exists(messageToSend)) {
			alert("Is there profanity in your message? Please edit your message and try sending again")
		}
		else {
			messageSent(messageToSend);
			setMessageToSend("");
		}
	}
			

	return (
		<div className='chatTextbox'>
			<IonItem>
				<IonTextarea value={messageToSend} onIonInput={e => setMessageToSend(e.target.value)} placeholder='Enter your message...'></IonTextarea>
			</IonItem>
			<IonButton onClick={() => processMessage()}>
				<IonIcon icon={send}></IonIcon>
			</IonButton>
		</div>
	);
};

export default ChatTextbox;
