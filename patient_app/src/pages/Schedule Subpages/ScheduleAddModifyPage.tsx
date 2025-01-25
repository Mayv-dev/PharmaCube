import {
  IonContent,
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import "./ScheduleAddModifyPage.css";

enum formState {
  ADD,
  MODIFY,
}

interface AddGameFormProps {
  enteredFormState: formState;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const ScheduleAddModifyPage: React.FC<AddGameFormProps> = ({ enteredFormState }) => {
  const [formState, setFormState] = useState<formState>(0);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [newTime, setNewTime] = useState<string>("");
  const [schedule, setSchedule] = useState<{ time: string }[]>([]);
  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    setFormState(enteredFormState);
    loadSchedule(selectedDay);
  }, [initialized, selectedDay]);

  async function loadSchedule(day: string) {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const result = await db?.query("SELECT time FROM schedule WHERE day = ?", [day]);
      setSchedule(result?.values || []);
    });
  }

  async function addTime() {
    if (!newTime) {
      alert("Please enter a time");
      return;
    }

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query("INSERT INTO schedule (day, time) VALUES (?, ?);", [selectedDay, newTime]);
        setSchedule((prev) => [...prev, { time: newTime }]);
        setNewTime("");
      });
    } catch (error) {
      alert((error as Error).message);
    }
  }

  async function deleteTime(time: string) {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query("DELETE FROM schedule WHERE day = ? AND time = ?", [selectedDay, time]);
        setSchedule((prev) => prev.filter((item) => item.time !== time));
      });
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {daysOfWeek.map((day) => (
              <IonCol key={day} size="1" className={selectedDay === day ? "selected-day" : "day-col"}>
                <IonButton fill="clear" onClick={() => setSelectedDay(day)}>
                  {day.charAt(0)}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonList>
          {schedule.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>{item.time}</IonLabel>
              <IonButton
                slot="end"
                color="danger"
                onClick={() => deleteTime(item.time)}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonItem>
          <IonLabel position="stacked">Add New Time:</IonLabel>
          <IonInput
            value={newTime}
            onIonChange={(e) => setNewTime(e.detail.value || "")}
            placeholder="Enter time (e.g., 13:00)"
          />
        </IonItem>

        <IonButton onClick={addTime} expand="block" color="primary">
          Add Time
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddModifyPage;
