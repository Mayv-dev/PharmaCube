# Pharmacist App

## Requirements
- Node.js version: v22.13.1

### Step 1: Environment Variables
- place a file called .env in the root of the pharmacist_app directory the .env file should contain the following:
VITE_ONESIGNAL_APP_ID = "89c58890-35c8-487b-86b7-37a6876xxxxx"
VITE_TESTER_NAME="Liam Murphy"
VITE_TESTER_EMAIL="liammurphy@gmail.com"
VITE_TESTER_PASSWORD="Oroabcd1234"
VITE_TESTER_PHARMACY_NAME="Allcare Pharmacy"
VITE_TESTER_PHARMACY_ADDRESS_1="Market Street"
VITE_TESTER_PHARMACY_ADDRESS_2="Carlingford"
VITE_TESTER_PHARMACY_ADDRESS_3="Co. Louth"
VITE_TESTER_PHARMACY_POSTCODE="A91 KF77"
VITE_SERVER_PROTOCOL="http"
VITE_SERVER_ADDRESS="localhost"
VITE_SERVER_PORT="8080"

Be sure to change these values as needed. For example:
- replace VITE_ONESIGNAL_APP_ID with your OneSignal App ID, if you want to test out notifications
- assign VITE_SERVER_PROTOCOL either http or https
- assign VITE_SERVER_ADDRESS another server's address/name if you have one

### Step 2: Preparation of Required Software 
1. [Install node.js ](https://nodejs.org/en/download)
2. npm install -g @ionic/cli
3. On Visual Studio Code, [download the Ionic extension](https://ionicframework.com/docs/intro/vscode-extension)

### Step 3: Setup and Run the App
Now, inside the pharmacist_app folder you have found this README.md file in, run the following commands: 
- npm install 
- ionic serve 