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
  IonToast,
  
} from "@ionic/react";
import { trashOutline, createOutline, checkmarkOutline, closeOutline, timeOutline, checkmarkCircle, closeCircle } from "ionicons/icons";
import axios from "axios";
import { ScheduleData, Medication } from "../../api types/types";
import { useColorblindFilter } from "../../colorBlindContext";
import "./ScheduleAddModifyPage.css";
import { getWeekdayName } from "../../helper functions/getWeekdayName";

const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
const timeOfDayMap: { [key: number]: string } = {
  1: "Morning",
  2: "Afternoon",
  3: "Evening",
  4: "Night",
};

const timePadding = (value: number): string => {
  return value < 10 ? `0${value}` : value.toString();
};

const ScheduleAddModifyPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [schedule, setSchedule] = useState<ScheduleData[]>([]);
  const [editedId, setEditedId] = useState<number>(-1);
  const [editHours, setEditHours] = useState<string>("");
  const [editMinutes, setEditMinutes] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState<number>(-1);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    loadSchedule(selectedDay);
  }, [selectedDay]);

  async function loadSchedule(day: number) {
    try {
      // Mock data - replace with your actual API call
      const mockData: ScheduleData[] = [
        { id: 1, day: 1, hour: 8, minute: 0, time_period: 1, taken: false, medications: [] },
        { id: 2, day: 1, hour: 12, minute: 0, time_period: 2, taken: false, medications: [] },
        { id: 3, day: 1, hour: 18, minute: 0, time_period: 3, taken: false, medications: [] },
        { id: 4, day: 1, hour: 22, minute: 0, time_period: 4, taken: false, medications: [] },
      ];

      const allTimesOfDay = Object.keys(timeOfDayMap).map((key) => parseInt(key, 10));
      const scheduleWithDefaults = allTimesOfDay.map((timePeriod) => {
        const existingItem = data.find((item: ScheduleData) => item.time_period === timePeriod && item.day === day);
        return existingItem || { id: -1, day, hour: 0, minute: 0, time_period: timePeriod };
      });
      setSchedule(scheduleWithDefaults);
    } catch (error) {
      console.error("Error loading schedule:", error);
    }
  }

  async function loadMedications() {
    try {
      const storedMedications = JSON.parse(localStorage.getItem('medications') || '[]');
      setMedications(storedMedications);
    } catch (error) {
      console.error("Error loading medications:", error);
    }
  }
  async function updateTime(timePeriod: number) {
    const hours = parseInt(editHours, 10);
    const minutes = parseInt(editMinutes, 10);
    
    if (isNaN(hours)) {
      setToastMessage("Please enter valid hours (0-23)");
      setShowToast(true);
      return;
    }
  
    if (isNaN(minutes)) {
      setToastMessage("Please enter valid minutes (0-59)");
      setShowToast(true);
      return;
    }
  
    if (hours < 0 || hours > 23) {
      setToastMessage("Hours must be between 0 and 23");
      setShowToast(true);
      return;
    }
  
    if (minutes < 0 || minutes > 59) {
      setToastMessage("Minutes must be between 0 and 59");
      setShowToast(true);
      return;
    }
  
    try {
      const existingItem = schedule.find((item) => item.time_period === timePeriod && item.day === selectedDay);
      const payload: ScheduleData = {
        id: existingItem?.id || -1,
        day: selectedDay,
        hour: editHours,
        minute: editMinutes,
        time_period: timePeriod,
      };

      if (existingItem?.id && existingItem.id !== -1) {
        await axios.put(`http://localhost:8080/patient/1/schedule/${existingItem.id}`, payload);
      } else {
        await axios.post(`http://localhost:8080/patient/1/schedule`, payload);
      }

      loadSchedule(selectedDay);
      setEditedId(-1);
      setToastMessage("Time updated successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error updating time:", error);
      setToastMessage("Error updating time");
      setShowToast(true);
    }
  }

  async function deleteTime(id: number) {
    try {
      const updatedSchedule = schedule.filter(item => item.id !== id);
      setSchedule(updatedSchedule);
      setShowModal(false);
      setToastMessage("Schedule deleted successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting time:", error);
      setToastMessage("Error deleting schedule");
      setShowToast(true);
    }
  }

  const timePadding = (value: number) => (value < 10 ? `0${value}` : value);

  return (
    <IonPage className={filter}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add/Modify Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding content">
        <IonGrid>
          <IonRow className="day-row">
            {daysOfWeek.map((day) => (
              <IonCol key={day} size="1" className={selectedDay === day ? "selected-day" : "day-col"}>
                <IonButton
                  fill="solid"
                  color={selectedDay === day ? "primary" : "light"}
                  expand="block"
                  onClick={() => setSelectedDay(day)}
                  className="day-button"
                >
                  {getWeekdayName(day)?.substring(0, 2)}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonList className="schedule-list">
          {schedule.map((item) => (
            <IonItem key={item.time_period} className="schedule-item">
              {editedId === item.time_period ? (
                <>
                  <IonInput
                    type="number"
                    value={editHours}
                    onIonChange={(e) => setEditHours(e.detail.value || "")}
                    placeholder={timePadding(item.hour)}
                    className="time-input"
                    min="0"
                    max="23"
                  />
                  :
                  <IonInput
                    type="number"
                    value={editMinutes}
                    onIonChange={(e) => setEditMinutes(e.detail.value || "")}
                    placeholder={timePadding(item.minute)}
                    className="time-input"
                    min="0"
                    max="59"
                  />
                  <IonButton slot="end" className="confirm-edit-button" onClick={() => updateTime(item.time_period)}>
                    <IonIcon icon={checkmarkOutline} />
                  </IonButton>
                  <IonButton slot="end" className="cancel-edit-button" onClick={() => setEditedId(-1)}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </>
              ) : (
                <>
                  <IonLabel className="schedule-label">
                    <IonIcon icon={timeOutline} className="time-icon" />
                    {timeOfDayMap[item.time_period]}: {timePadding(item.hour)}:{timePadding(item.minute)}
                    {item.medications && item.medications.length > 0 && (
                      <div className="medications-list">
                        {item.medications.map((medication) => (
                          <div key={medication.id} className="medication-item">
                            <small>{medication.name} - {medication.amount}</small>
                          </div>
                        ))}
                      </div>
                    )}
                  </IonLabel>
                  <IonButton slot="end" className="edit-button" onClick={() => { setEditedId(item.time_period); setEditHours(item.hour); setEditMinutes(item.minute); }}>
                    <IonIcon icon={createOutline} />
                  </IonButton>
                  {item.id !== -1 && (
                    <IonButton 
                      slot="end" 
                      className="delete-button" 
                      onClick={() => { 
                        setDeleteScheduleId(item.id); 
                        setShowModal(true); 
                      }}
                    >
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  )}
                  <IonButton
                    slot="end"
                    color={item.taken ? 'success' : 'danger'}
                    onClick={() => handleMedicationStatus(item.time_period, !item.taken)}
                  >
                    <IonIcon icon={item.taken ? checkmarkCircle : closeCircle} />
                  </IonButton>
                  <IonButton
                    slot="end"
                    color={item.taken ? 'success' : 'danger'}
                    onClick={() => handleMedicationStatus(item.time_period, !item.taken)}
                  >
                    <IonIcon icon={item.taken ? checkmarkCircle : closeCircle} />
                  </IonButton>
                </>
              )}
            </IonItem>
          ))}
        </IonList>

        {/* Delete confirmation modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle className="ion-text-center title">Confirm Deletion</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Are you sure you wish to delete this time?</p>
            <IonButton expand="full" className="confirm-delete-button" onClick={() => deleteTime(deleteScheduleId)}>
              Yes
            </IonButton>
            <IonButton expand="full" className="cancel-delete-button" onClick={() => setShowModal(false)}>
              No
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Toast for feedback */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddModifyPage;