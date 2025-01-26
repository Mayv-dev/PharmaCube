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
import { trashOutline, createOutline, checkmarkOutline, closeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import "./ScheduleAddModifyPage.css";
import "./ScheduleAddTime.css";

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
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [editingTime, setEditingTime] = useState<string | null>(null);
  const [editHours, setEditHours] = useState<string>("");
  const [editMinutes, setEditMinutes] = useState<string>("");

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
    const formattedTime = formatTime(hours, minutes);
    if (!formattedTime) return;

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query("INSERT INTO schedule (day, time) VALUES (?, ?);", [selectedDay, formattedTime]);
        setSchedule((prev) => [...prev, { time: formattedTime }]);
        setHours("");
        setMinutes("");
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

  async function editTimeConfirm(originalTime: string) {
    const formattedTime = formatTime(editHours, editMinutes);
    if (!formattedTime) return;

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query("UPDATE schedule SET time = ? WHERE day = ? AND time = ?", [formattedTime, selectedDay, originalTime]);
        setSchedule((prev) =>
          prev.map((item) => (item.time === originalTime ? { time: formattedTime } : item))
        );
        setEditingTime(null);
        setEditHours("");
        setEditMinutes("");
      });
    } catch (error) {
      alert((error as Error).message);
    }
  }

  function formatTime(hours: string, minutes: string): string | null {
    const hoursNum = parseInt(hours, 10);
    const minutesNum = parseInt(minutes, 10);

    if (isNaN(hoursNum) || isNaN(minutesNum)) {
      alert("Please enter valid numbers for hours and minutes.");
      return null;
    }
    if (hoursNum < 0 || hoursNum > 23) {
      alert("Hours must be between 0 and 23.");
      return null;
    }
    if (minutesNum < 0 || minutesNum > 59) {
      alert("Minutes must be between 0 and 59.");
      return null;
    }

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
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

        <IonItem>
          <IonLabel position="stacked">Add New Time:</IonLabel>
          <div className="time-input-container">
            <IonInput
              type="number"
              value={hours}
              onIonChange={(e) => setHours(e.detail.value || "")}
              placeholder="HH"
              className="time-input"
            />
            :
            <IonInput
              type="number"
              value={minutes}
              onIonChange={(e) => setMinutes(e.detail.value || "")}
              placeholder="MM"
              className="time-input"
            />
          </div>
        </IonItem>

        <IonButton onClick={addTime} expand="block" color="primary">
          Add Time
        </IonButton>

        <IonList>
          {schedule.map((item, index) => (
            <IonItem key={index}>
              {editingTime === item.time ? (
                <>
                  <IonInput
                    type="number"
                    value={editHours}
                    onIonChange={(e) => setEditHours(e.detail.value || "")}
                    placeholder="HH"
                    className="time-input"
                  />
                  :
                  <IonInput
                    type="number"
                    value={editMinutes}
                    onIonChange={(e) => setEditMinutes(e.detail.value || "")}
                    placeholder="MM"
                    className="time-input"
                  />
                  <IonButton slot="end" color="success" onClick={() => editTimeConfirm(item.time)}>
                    <IonIcon icon={checkmarkOutline} />
                  </IonButton>
                  <IonButton slot="end" color="medium" onClick={() => setEditingTime(null)}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </>
              ) : (
                <>
                  <IonLabel>{item.time}</IonLabel>
                  <IonButton slot="end" color="primary" onClick={() => {
                    setEditingTime(item.time);
                    const [hh, mm] = item.time.split(":");
                    setEditHours(hh);
                    setEditMinutes(mm);
                  }}>
                    <IonIcon icon={createOutline} />
                  </IonButton>
                  <IonButton slot="end" color="danger" onClick={() => deleteTime(item.time)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </>
              )}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddModifyPage;
