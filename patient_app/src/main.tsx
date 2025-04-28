import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


import { Capacitor } from "@capacitor/core";
import {
  CapacitorSQLite,
  SQLiteConnection,
} from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

const initializeWebStore = async () => {
  try {
    const platform = Capacitor.getPlatform();
    if (platform === "web") {
      if (!customElements.get('jeep-sqlite')) {
        customElements.define("jeep-sqlite", JeepSqlite);
      }

      await customElements.whenDefined("jeep-sqlite");

      const sqliteDiv = document.createElement('div');
      sqliteDiv.id = 'sqlite-container';
      document.body.appendChild(sqliteDiv);

      const jeepSqlite = document.createElement('jeep-sqlite');
      sqliteDiv.appendChild(jeepSqlite);

      const sqlite = new SQLiteConnection(CapacitorSQLite);
      try {
        await sqlite.initWebStore();
        console.log('SQLite web store initialized successfully');
        return sqlite;
      } catch (err) {
        console.error('Error initializing SQLite web store:', err);
        throw err;
      }
    }
    return null;
  } catch (e) {
    console.error('Error in SQLite initialization:', e);
    throw e;
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await initializeWebStore();
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (e) {
    console.error('Error in main initialization:', e);
  }
});