/*
	NOTE: THIS IS NOT THE ACTUAL FILE USED, CREATE A NEW FILE CALLED firebase-messaging-sw.js, COPY THE CODE HERE AND 
	AND FILL IN THE firebaseConfig FIELDS. THE GITIGNORE WILL PREVENT KEYS PUT IN YOUR LOCAL VERSION OF THAT FILE 
	FROM BEING PUSHED/LEAKED
*/

// Firebase notification code video reference: https://www.youtube.com/watch?v=IK8x7qc9ZsA
// Firebase notification code import reference: https://console.firebase.google.com/

import { fb_api_key, fb_app_id, fb_auth_domain, fb_measurement_id, fb_messaging_sender_id, fb_project_id, fb_storage_bucket, fb_vapid_key } from "../src/pages/firebaseEnv";

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	apiKey: "", //Enter FIREBASE_API_KEY her,
	authDomain: "", //Enter FIREBASE_AUTH_DOMAIN here
	projectId: "", //Enter FIREBASE_PROJECT_ID here
	storageBucket: "", //Enter FIREBASE_STORAGE_BUCKET here
	messagingSenderId: "", //Enter FIREBASE_MESSAGING_SENDER_ID here
	appId: "", //Enter FIREBASE_APP_ID here
	measurementId: "" //Enter FIREBASE_MEASUREMENT_ID here
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
	  '[firebase-messaging-sw.js] Received background message ',
	  payload
	);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
	  body: payload.notification.body,
	  icon: payload.notification.image
	};
  
	self.registration.showNotification(notificationTitle, notificationOptions);
  });