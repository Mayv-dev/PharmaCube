import React, { useEffect, useState } from "react";
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
  IonSelect,
} from "@ionic/react";
import { trashOutline, createOutline, checkmarkOutline, closeOutline } from "ionicons/icons";
import axios from "axios";
import { ScheduleData } from "../../api types/types";
import useSQLiteDB from "../../composables/useSQLiteDB";
import "./ScheduleAddModifyPage.css";
import { getWeekdayName } from "../../helper functions/getWeekdayName";


const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

const ScheduleAddModifyPage: React.FC = () => {
  const [deleteScheduleId, setDeleteScheduleId] = useState<number>(-1);
  const [selectedDay, setSelectedDay] = useState<number | null>(1);
  const [schedule, setSchedule] = useState<ScheduleData[]>([]);
  const { performSQLAction, initialized } = useSQLiteDB();
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [editedId, setEditedId] = useState<number>();
  const [editHours, setEditHours] = useState<number>();
  const [editMinutes, setEditMinutes] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<number | null>(null);

  const timeOfDayMap: { [key: number]: string } = {
    1: "Morning",
    2: "Afternoon",
    3: "Evening",
    4: "Night",
  };

  useEffect(() => {
    loadSchedule(selectedDay);
  }, [initialized, selectedDay]);

  async function loadSchedule(day: number | null) {
    try {
      const { data, status } = await axios.get("http://localhost:8080/patient/1/schedule", {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("schedule data from GET:", data);
      const scheduleitemsbyday = data.filter((item: ScheduleData) => (item.day == selectedDay ? true : false));
      setSchedule(
        scheduleitemsbyday.map((sItem: ScheduleData) => {
          return { id: sItem.id, day: sItem.day, hour: sItem.hour, minute: sItem.minute, time_period: sItem.time_period };
        }) || []
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  async function addTime() {
    const formattedTime = formatTime(hours, minutes);
    if (!formattedTime) return;
    if (typeof selectedDay != "number" || typeof selectedTimeOfDay != "number") return;
    if (schedule.find((sItem) => sItem.time_period == selectedTimeOfDay && sItem.day == selectedDay) != undefined) {
      alert("This time of day has already been set for today");
      return;
    }
    try {
      let scheduleData: ScheduleData = {
        id: 0,
        day: selectedDay,
        hour: parseInt(hours, 10),
        minute: parseInt(minutes, 10),
        time_period: selectedTimeOfDay,
      };
      console.log("post request being made...");
      const { data, status } = await axios.post("http://localhost:8080/patient/1/schedule", scheduleData, {
        headers: {
          Accept: "application/json",
        },
      });
      loadSchedule(selectedDay);

      setHours("");
      setMinutes("");

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  const confirmDeletion = (id: number) => {
    setDeleteScheduleId(id);
    setShowModal(true);
  };

  async function deleteTime(id: number) {
    try {
      const { data, status } = await axios.delete(`http://localhost:8080/patient/1/schedule/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      loadSchedule(selectedDay);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  const timePadding = (hourOrMinute: number) => (hourOrMinute < 10 ? "0" + hourOrMinute : hourOrMinute);

  async function editTimeConfirm(timeOfDay: number) {
    console.log(editHours, editMinutes, editedId, selectedDay);
    if (editHours == undefined || editMinutes == undefined || editedId == undefined || selectedDay == undefined) return;
    if (editHours > 23 || editHours < 0) return;
    if (editMinutes > 59 || editMinutes < 0) return;

    try {
      console.log("put request being made...");
      const modifiedScheduleItem: ScheduleData = {
        id: editedId,
        day: selectedDay,
        hour: editHours,
        minute: editMinutes,
        time_period: timeOfDay,
      };
      const { data, status } = await axios.put(
        `http://localhost:8080/patient/1/schedule/${editedId}`,
        modifiedScheduleItem,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setEditedId(-1);
      setEditHours(-1);
      setEditMinutes(-1);
      loadSchedule(selectedDay);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
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
        <IonToolbar color="primary">
          <IonTitle className="ion-text-center title">Your Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding content" color="secondary">
        <IonGrid>
          <IonRow>
            {daysOfWeek.map((day) => (
              <IonCol key={day} size="1" className={selectedDay === day ? "selected-day" : "day-col"}>
                <IonButton
                  fill="clear"
                  onClick={() => setSelectedDay(day)}
                  className={selectedDay === day ? "selected-day-button" : "day-button"}
                >
                  {getWeekdayName(day)?.substring(0, 2)}
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
                <IonSelectOption value={1}>Morning</IonSelectOption>
                <IonSelectOption value={2}>Afternoon</IonSelectOption>
                <IonSelectOption value={3}>Evening</IonSelectOption>
                <IonSelectOption value={4}>Night</IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>
        </IonItem>

        <IonButton onClick={addTime} expand="block" className="add-time-button">
          Add Time
        </IonButton>

        <IonList className="schedule-list">
          {schedule.map((item, index) => (
            <IonItem key={index} className="schedule-item">
              {item.id == editedId ? (
                <>
                  <IonInput
                    type="number"
                    value={editHours}
                    onIonChange={(e) => setEditHours(parseInt(e.detail.value, 10))}
                    placeholder="HH"
                    className="time-input"
                  />
                  :
                  <IonInput
                    type="number"
                    value={editMinutes}
                    onIonChange={(e) => setEditMinutes(parseInt(e.detail.value, 10))}
                    placeholder="MM"
                    className="time-input"
                  />
                  <IonButton slot="end" className="confirm-edit-button" onClick={() => editTimeConfirm(item.time_period)}>
                    <IonIcon icon={checkmarkOutline} />
                  </IonButton>
                  <IonButton slot="end" className="cancel-edit-button" onClick={() => { setEditedId(-1); setEditHours(-1); setEditMinutes(-1); }}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </>
              ) : (
                <>
                  <IonLabel className="schedule-label">
                    {timePadding(item.hour)}:{timePadding(item.minute)} | {timeOfDayMap[item.time_period] || "Unknown Time"}
                  </IonLabel>
                  <IonButton slot="end" className="edit-button" onClick={() => { setEditedId(item.id); setEditHours(item.hour); setEditMinutes(item.minute); }}>
                    <IonIcon icon={createOutline} />
                  </IonButton>
                  <IonButton slot="end" className="delete-button" onClick={() => confirmDeletion(item.id)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </>
              )}
            </IonItem>
          ))}
        </IonList>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle className="ion-text-center title">Confirm Deletion</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Are you sure you wish to delete this time?</p>
            <IonButton expand="full" className="confirm-delete-button" onClick={() => { deleteTime(deleteScheduleId); setShowModal(false); }}>
              Yes
            </IonButton>
            <IonButton expand="full" className="cancel-delete-button" onClick={() => setShowModal(false)}>
              No
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddModifyPage;