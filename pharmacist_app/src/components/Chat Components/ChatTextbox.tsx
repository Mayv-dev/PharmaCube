import {
	IonButton,
	IonIcon,
	IonInput,
	IonLabel,
	IonTabBar,
	IonTabButton
} from '@ionic/react';
import { musicalNotes, send } from 'ionicons/icons';
import { useState } from 'react';
import { boolean } from 'yup';

import { profanity } from '@2toad/profanity';

type ChatTextboxProps = {
	messageSent:any; // could use this to send the go-ahead to update the state above (e.g. the new chat bubble from your message)
}


const ChatTextbox: React.FC<ChatTextboxProps> = ({messageSent}) => {
	const [messageToSend, setMessageToSend] = useState<string>("");

	

	const processMessage = () => messageToSend.length == 0 || profanity.exists(messageToSend) ? null : messageSent(messageToSend);

	return (
		<div>
			<IonInput value={messageToSend} onIonChange={e => setMessageToSend(e.target.value)} placeholder='Enter your message...'></IonInput>
			<IonButton onClick={() => processMessage()}>
				<IonIcon icon={send}></IonIcon>
			</IonButton>
		</div>
	);
};

export default ChatTextbox;
