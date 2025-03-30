# Pharmacist App

## Setting Up Our Current App
### Step 1: Dependencies
- Inside the pharmacist app folder, you will want to run the following command to install the code dependencies required:
	- npm install
### Step 2: Environment Variables
- You must add the app ID for OneSignal notifications in a new .env file, under the name VITE_ONESIGNAL_APP_ID
### Step 3: Hidden Files for notification services
1. Locate the following two files
	- \PharmaCube\pharmacist_app\src\notifications\TEMPLATE_firebase.js
	- \PharmaCube\pharmacist_app\public\TEMPLATE_firebase-messaging-sw.js

2. In the same directory, copy the files and perform the following renames (the names should appear grey, as they are gitignored):
	- TEMPLATE_firebase.js ---> firebaseHidden.js
	- TEMPLATE_firebase-messaging-sw.js ---> firebase-messaging-sw.js

3. Follow the in-file instructions, filling in each hidden Firebase variable with the values from your Firebase project's console

## How We Started From Scratch
### Step 1: Preparation of Required Software 
1. Install node.js 
2. On Visual Studio Code, download the Ionic extension
3. Install Android Studio 

### Step 2: Create Your Ionic Project 

1. Navigate to the folder you want to create your project in 
2. Next run the following commands: 
	- npm install -g @ionic/cli 
	- ionic start myApp tabs --type react 
		- Note that for the name myApp, you should replace this with whatever name is used for the app you are making. e.g. Pharmacube / ORO
		- Also, the ionic start command took 4 minutes to fully set up, so don’t be too alarmed by a long wait time 

3. Now, navigate into the folder with the same name as the ionic app you just created, then run the following commands: 
	- npm install 
	- ionic serve 

### Step 3a: Convert Web App to Mobile (Android) 
1. Using the VSCode Ionic extension, click “Add Android Project” and be sure to accept the pop up on bottom right asking you to confirm your choice. 
2. Run "Build" and then "Sync" under the project tab
3. Click on the “Open in Android Studio” option, it will automatically open the app in android studio.  
4. Run the app on either a virtual phone, or an android phone in developer mode by pressing the play button in android studio.

### Step 3b: Convert Web App to Mobile (IOS) 
1. Using the VSCode Ionic extension, click “Add iOS Project” and be sure to accept the pop up on bottom right asking you to confirm your choice. 
2. Run "Build" and then "Sync" under the project tab
3. Open App.xcworkspace (inside ios/APP)