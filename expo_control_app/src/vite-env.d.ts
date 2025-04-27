/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ONESIGNAL_APP_ID: string
	readonly VITE_ONESIGNAL_API_KEY: string

	readonly VITE_SERVER_PROTOCOL: string
	readonly VITE_SERVER_ADDRESS: string
	readonly VITE_SERVER_PORT: string
  }
  
  interface ImportMeta {
	readonly env: ImportMetaEnv
  }