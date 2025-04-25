import { useEffect, useState } from 'react';

type ChatProfileProps = {
	passedPatientName:string;
	passedMessage:string;
}

const ChatProfile: React.FC<ChatProfileProps> = ({passedPatientName,passedMessage}) => {
	const [patientName, setPatientName] = useState<string>("")
	const [message, setMessage] = useState<string>("")

	useEffect(() =>{
			setMessage(passedMessage);
			setPatientName(passedPatientName);
		}
		,[passedPatientName,passedMessage]
	)

	return (
		<div>
			{/* I use the picture from wikipedia as a stand-in for real pictures that would be stored on the server: https://commons.wikimedia.org/wiki/File:Portrait_Placeholder.png */}
			<img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"></img>
			<div>
				<p>{patientName}</p>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default ChatProfile;
