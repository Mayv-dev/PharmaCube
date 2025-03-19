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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
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
			vapidKey:"BKJsiqHjj0ifa7h3cnbHU7n7TivMFoJU6zaUxOazNyAJmHwl8Zbyb0KrR8xh3RcEx9L7FJnLkrCTf0_f-G7vIGA"
		});
		console.log(token);
	}
}