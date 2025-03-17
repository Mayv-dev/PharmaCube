import { TextToSpeech } from '@capacitor-community/text-to-speech';
import {
	IonButton,
	IonIcon,
	IonLabel,
	IonTabBar,
	IonTabButton
} from '@ionic/react';
import { musicalNotes } from 'ionicons/icons';
import { useEffect, useState } from 'react';

type ChatBubbleProps = {
	passedMessage:string;
	passedDateTimeOfMessage:string
}

const ChatBubble: React.FC<ChatBubbleProps> = ({passedMessage,passedDateTimeOfMessage}) => {
	const [message, setMessage] = useState<string>("")
	const [datetimeOfMessage, setDatetimeOfMessage] = useState<string>("")

	useEffect(() =>{
			setMessage(passedMessage);
			setDatetimeOfMessage(passedDateTimeOfMessage);
		}
		,[passedDateTimeOfMessage,passedMessage]
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
		<div>
			<p>{message}</p>
			<div>
				<IonButton onClick={() => speak()}>
					<IonIcon icon={musicalNotes}></IonIcon>
				</IonButton>
				<p>{datetimeOfMessage}</p>
			</div>
		</div>
	);
};

export default ChatBubble;
