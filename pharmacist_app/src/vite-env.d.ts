/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ONESIGNAL_APP_ID: string

	readonly VITE_TESTER_NAME: string
	readonly VITE_TESTER_EMAIL: string
	readonly VITE_TESTER_PASSWORD: string
	readonly VITE_TESTER_PHARMACY_NAME: string
	readonly VITE_TESTER_PHARMACY_ADDRESS_1: string
	readonly VITE_TESTER_PHARMACY_ADDRESS_2: string
	readonly VITE_TESTER_PHARMACY_ADDRESS_3: string
	readonly VITE_TESTER_PHARMACY_POSTCODE: string

	readonly VITE_SERVER_PROTOCOL: string
	readonly VITE_SERVER_ADDRESS: string
	readonly VITE_SERVER_PORT: string
  }
  
  interface ImportMeta {
	readonly env: ImportMetaEnv
  }