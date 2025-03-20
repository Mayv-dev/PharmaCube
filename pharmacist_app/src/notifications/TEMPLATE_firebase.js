/*
	NOTE: THIS IS NOT THE ACTUAL FILE USED, CREATE A NEW FILE CALLED firebaseHidden.js AND FILL IN THE firebaseConfig FIELDS THERE
	THE GITIGNORE WILL PREVENT KEYS PUT IN YOUR LOCAL VERSION OF THAT FILE FROM BEING PUSHED/LEAKED
*/

// Firebase notification code video reference: https://www.youtube.com/watch?v=IK8x7qc9ZsA
// Firebase notification code import reference: https://console.firebase.google.com/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "", //Enter FIREBASE_API_KEY her,
  authDomain: "", //Enter FIREBASE_AUTH_DOMAIN here
  projectId: "", //Enter FIREBASE_PROJECT_ID here
  storageBucket: "", //Enter FIREBASE_STORAGE_BUCKET here
  messagingSenderId: "", //Enter FIREBASE_MESSAGING_SENDER_ID here
  appId: "", //Enter FIREBASE_APP_ID here
  measurementId: "" //Enter FIREBASE_MEASUREMENT_ID here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export const generateToken = async () => {
	const permission = await Notification.requestPermission();
	console.log(permission);
	if(permission === "granted")
	{
		const token = await getToken(messaging, {
			vapidKey:"" //Enter FIREBASE_VAPID_KEY here
		});
		console.log(token);
	}
}