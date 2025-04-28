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


window.addEventListener("DOMContentLoaded", async () => {
  try {
    const platform = Capacitor.getPlatform();


    // WEB SPECIFIC FUNCTIONALITY
    if (platform === "web") {
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      // Create the 'jeep-sqlite' Stencil component
      customElements.define("jeep-sqlite", JeepSqlite);
      const jeepSqliteEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepSqliteEl);
      await customElements.whenDefined("jeep-sqlite");
      console.log(`after customElements.whenDefined`);

      // Initialize the Web store
      await sqlite.initWebStore();
      console.log(`after initWebStore`);
    }

    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
        // To fix API calls occuring multiple times, particularly affecting the chat feature with duplication of patient chats,
        // I removed strict mode. https://medium.com/@yaseen-kc/why-is-my-api-call-happening-twice-in-react-d9dc06dec962
        <App />
    );
  } catch (e) {
    console.log(e);
  }
});