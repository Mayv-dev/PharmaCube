//import ExploreContainer from '../components/ExploreContainer';
import '../../styles/Medication Subpages/Medication Components/DeleteConfirmationPopup.css';

type popupInfo = {
	med_name: string;
	user_name: string;
  };

const DeleteConfirmationPopup: React.FC<popupInfo> = ({med_name,user_name}) => {
  return (
	<div id="interactionBlocker">
		<div id="dialogBox">
			<p>Are you sure you want to delete {med_name} from {user_name}'s medication list?</p>
			<button onClick={e => console.log("delete")}>Yes</button>
			<button onClick={e => console.log("return")}>No</button>
		</div>
	</div>
  );
};

export default DeleteConfirmationPopup;