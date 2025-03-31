//import ExploreContainer from '../components/ExploreContainer';
import '../../styles/Medication Subpages/Medication Components/DeleteConfirmationPopup.css';

type popupInfo = {
	med_name: string;
	user_name: string;
	delete_denied:any;
	delete_confirmed:any;
  };

const DeleteConfirmationPopup: React.FC<popupInfo> = ({med_name,user_name,delete_denied,delete_confirmed}) => {
  return (
	<div id="interactionBlocker">
		<div id="dialogBox">
			<p>Are you sure you want to delete {med_name} from {user_name}'s medication list?</p>
			<button onClick={e => delete_confirmed()}>Yes</button>
			<button onClick={e => delete_denied()}>No</button>
		</div>
	</div>
  );
};

export default DeleteConfirmationPopup;