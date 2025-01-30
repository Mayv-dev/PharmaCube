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
  IonModal,
  IonSelectOption,
  IonSelect
} from "@ionic/react";
import { trashOutline, createOutline, checkmarkOutline, closeOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import axios from 'axios';


import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import "./ScheduleAddModifyPage.css";

const daysOfWeek = [0,1,2,3,4,5,6];

function getWeekdayName(dayNumber: number): string | null {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  return dayNumber >= 0 && dayNumber <= 6 ? weekdays[dayNumber] : null;
}


const ScheduleAddModifyPage: React.FC = () => {

  const [deleteScheduleId, setDeleteScheduleId] = useState<number>(-1);

  const [selectedDay, setSelectedDay] = useState<number | null>(0);

  const [newTime, setNewTime] = useState<string>("");

  const [schedule, setSchedule] = useState<{ id:number, day:number, timeofday:number, time: string }[]>([]);

  const { performSQLAction, initialized } = useSQLiteDB();

  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");

  const [editingTime, setEditingTime] = useState<string | null>(null);
  const [editHours, setEditHours] = useState<string>("");
  const [editMinutes, setEditMinutes] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<number | null>(null);



  useEffect(() => {
    loadSchedule(selectedDay);
  }, [initialized, selectedDay]);

  async function loadSchedule(day: number | null) {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const result = await db?.query("SELECT id, day, time, timeofday FROM schedule WHERE day = ?", [day]);
      console.log(result)
      setSchedule(result?.values || []);

      try {
        const { data, status } = await axios.get(
          'https://demo3553220.mockable.io/',
          {
          headers: {
            Accept: 'application/json'
          },
          },
        );
      
        return data;
      
        } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
        }
    });
  }

  async function addTime() {
    const formattedTime = formatTime(hours, minutes);
    if (!formattedTime) return;

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const repeatingTime = await db?.query("SELECT COUNT(*) FROM schedule WHERE timeofday = ? AND day = ?;", [selectedTimeOfDay, selectedDay]);
        console.log(repeatingTime?.values?.at(0)["COUNT(*)"])
        if(repeatingTime?.values?.at(0)["COUNT(*)"] > 0) {
          alert("This time of day already exists");
          return;
        }
        else {
          await db?.query("INSERT INTO schedule (day, time, timeofday) VALUES (?, ?, ?);", [selectedDay, formattedTime, selectedTimeOfDay]);
          const generatedId = await db?.query("SELECT id FROM schedule WHERE day = ? AND time = ? AND timeOfDay = ?", [selectedDay, formattedTime, selectedTimeOfDay]);
          const newId:number = typeof generatedId?.values?.at(0).id == "number" ? generatedId?.values?.at(0).id : 0
          console.log("Inserting ", { id: newId, day:selectedDay, time: formattedTime })
          if(typeof selectedDay == "number" && typeof selectedTimeOfDay == "number") {
            setSchedule((prev) => [...prev, { id: newId, day:selectedDay, time: formattedTime, timeofday:selectedTimeOfDay }]);
          }

          setHours("");
          setMinutes("");
          try {
            console.log("post request being made...")
            const { data, status } = await axios.post(
              'https://demo3553220.mockable.io/patient/id/schedule',
              {
                id: newId,
                day: selectedDay,
                time: formattedTime,
                timeOfDay:selectedTimeOfDay
              },
              {
                headers: {
                  Accept: 'application/json'
                },
              },
            );
            return data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
        }
      }
      });



    } catch (error) {
      alert((error as Error).message);
    }
  }


  const confirmDeletion = (id:number) => {
    setDeleteScheduleId(id)
    setShowModal(true)
    }

  async function deleteTime(id:number) {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query("DELETE FROM schedule WHERE id = ?", [id]);
        setSchedule((prev) => prev.filter((item) => item.id !== id));
      });

      try {
        const { data, status } = await axios.delete(
          `https://demo3553220.mockable.io/patient/id/schedule`,
          {
          headers: {
            Accept: 'application/json'
          },
          data: {
            "id":id
          }
          }
        );

        return data;
      
        } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
        }



    } catch (error) {
      alert((error as Error).message);
    }
  }

  async function editTimeConfirm(originalTime: string, id:number) {
    const formattedTime = formatTime(editHours, editMinutes);
    if (!formattedTime) return;

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        await db?.query("UPDATE schedule SET time = ? WHERE day = ? AND time = ?", [formattedTime, selectedDay, originalTime]);
        const generatedId = await db?.query("SELECT id FROM schedule WHERE day = ? AND time = ?", [selectedDay, formattedTime]);
        const newId:number = typeof generatedId?.values?.at(0).id == "number" ? generatedId?.values?.at(0).id : 0
        console.log("Updating ", { id: newId, day:selectedDay, time: formattedTime })
        if(typeof selectedDay == "number") {
          setSchedule((prev) =>
            prev.map((item) => (item.time === originalTime ? { id:newId, day: selectedDay, time: formattedTime , timeofday:item.timeofday} : item))
          );
      }
        setEditingTime(null);
        setEditHours("");
        setEditMinutes("");

        try {
          console.log("put request being made...")
          const { data, status } = await axios.put(
            'https://demo3553220.mockable.io/patient/id/schedule',
            {
              id: newId,
              day: selectedDay,
              time: formattedTime
            },
            {
              headers: {
                Accept: 'application/json'
              },
            },
          );
          return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
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

      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            {daysOfWeek.map((day) => (
              <IonCol key={day} size="1" className={selectedDay === day ? "selected-day" : "day-col"}>
                <IonButton fill="clear" onClick={() => setSelectedDay(day)}>
                  {getWeekdayName(day)?.substring(0,2)}
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
    <IonItem>
      <IonLabel position="fixed">Time of Day:</IonLabel>
      <IonSelect onIonChange={(e) => setSelectedTimeOfDay(e.detail.value)}>
        <IonSelectOption value={0}>Late Night</IonSelectOption>
        <IonSelectOption value={1}>Early Morning</IonSelectOption>
        <IonSelectOption value={2}>Morning</IonSelectOption>
        <IonSelectOption value={3}>Afternoon</IonSelectOption>
        <IonSelectOption value={4}>Evening</IonSelectOption>
        <IonSelectOption value={5}>Night</IonSelectOption>
      </IonSelect>
    </IonItem>
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
                  <IonButton slot="end" color="success" onClick={() => editTimeConfirm(item.time, item.id)}>
                    <IonIcon icon={checkmarkOutline} />
                  </IonButton>
                  <IonButton slot="end" color="medium" onClick={() => setEditingTime(null)}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </>
              ) : (
                <>
                  <IonLabel>{item.time} | Part Of Day:{item.timeofday}</IonLabel>
                  <IonButton slot="end" color="primary" onClick={() => {
                    setEditingTime(item.time);
                    const [hh, mm] = item.time.split(":");
                    setEditHours(hh);
                    setEditMinutes(mm);
                  }}>
                    <IonIcon icon={createOutline} />
                  </IonButton>
                  <IonButton slot="end" color="danger" onClick={() => confirmDeletion(item.id)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </>
              )}
            </IonItem>
          ))}
        </IonList>


        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Confirm Submission</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Are you sure you wish to delete this time?</p>
            <IonButton expand="full" color="primary" onClick={() => {
              deleteTime(deleteScheduleId)
              setShowModal(false)}}>
              Yes
            </IonButton>
            <IonButton expand="full" color="medium" className="cancel-button" onClick={() => setShowModal(false)}>
              No
            </IonButton>
          </IonContent>
        </IonModal>


      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddModifyPage;
