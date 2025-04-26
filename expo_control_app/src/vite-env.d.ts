/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SERVER_PROTOCOL: string
	readonly VITE_SERVER_ADDRESS: string
	readonly VITE_SERVER_PORT: string
  }
  
  interface ImportMeta {
	readonly env: ImportMetaEnv
  }