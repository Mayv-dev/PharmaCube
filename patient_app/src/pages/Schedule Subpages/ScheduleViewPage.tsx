import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./ScheduleViewPage.css";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";

// Type definition for a schedule entry
type SQLItem = {
  id: number;
  day: number;
  timeofday: number;
  time: string;
};

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const timeOfDayMap: { [key: number]: string } = {
  1: "Early Morning",
  2: "Morning",
  3: "Afternoon",
  4: "Evening",
  5: "Night",
};

const ScheduleViewPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday"); // Default to Monday
  const [schedule, setSchedule] = useState<SQLItem[]>([]);

  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    if (initialized) {
      loadData(selectedDay);
    }
  }, [initialized, selectedDay]);

  const loadData = async (day: string) => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query("SELECT * FROM schedule WHERE day = ?", [day]);
        setSchedule(respSelect?.values || []);
      });
    } catch (error) {
      alert((error as Error).message);
      setSchedule([]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center title">Your Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding content" color="secondary">
        {/* Day Selector */}
        <IonGrid>
          <IonRow>
            {daysOfWeek.map((day) => (
              <IonCol key={day} size="1" className={selectedDay === day ? "selected-day" : "day-col"}>
                <IonButton
                  fill="clear"
                  onClick={() => setSelectedDay(day)}
                  className={selectedDay === day ? "selected-day-button" : "day-button"}
                >
                  {day.charAt(0)}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Schedule List */}
        <IonList className="schedule-list">
          {schedule.map((item) => (
            <IonItem key={item.id} className="schedule-item">
              <IonLabel className="schedule-label">
                {item.time} | {timeOfDayMap[item.timeofday] || "Unknown Time"}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* No Entries Message */}
        {schedule.length === 0 && (
          <IonItem className="no-entries-item">
            <IonLabel className="no-entries-label">No entries for {selectedDay}</IonLabel>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ScheduleViewPage;