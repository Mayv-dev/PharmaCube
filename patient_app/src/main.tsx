import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


// This file's sqlite content was taken from the video used to implement sqlite in our project https://www.youtube.com/watch?v=tixvx5nsJO8&t=1130s
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
      // Define custom element if not already defined
      if (!customElements.get('jeep-sqlite')) {
        customElements.define("jeep-sqlite", JeepSqlite);
      }

      // Wait for custom element to be defined
      await customElements.whenDefined("jeep-sqlite");

      // Create a placeholder div for the SQLite element
      const sqliteDiv = document.createElement('div');
      sqliteDiv.id = 'sqlite-container';
      document.body.appendChild(sqliteDiv);

      // Create and configure the jeep-sqlite element
      const jeepSqlite = document.createElement('jeep-sqlite');
      sqliteDiv.appendChild(jeepSqlite);

      // Initialize SQLite connection
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
    // Initialize SQLite for web platform
    await initializeWebStore();

    // Render the React application
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