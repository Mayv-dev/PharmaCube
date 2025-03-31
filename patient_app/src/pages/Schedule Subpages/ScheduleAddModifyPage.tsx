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
  IonSelect,
  IonSelectOption,
  IonToast,
  IonTextarea,
  IonCheckbox,
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
  const [editHours, setEditHours] = useState<number>(0);
  const [editMinutes, setEditMinutes] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState<number>(-1);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showMissingDoseModal, setShowMissingDoseModal] = useState<boolean>(false);
  const [missingDoseHandling, setMissingDoseHandling] = useState<string>("");
  const [currentTimePeriod, setCurrentTimePeriod] = useState<number>(-1);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState<boolean>(false);
  const [selectedMedications, setSelectedMedications] = useState<Medication[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const { filter } = useColorblindFilter();

  useEffect(() => {
    loadSchedule(selectedDay);
    const storedMedications = JSON.parse(localStorage.getItem('medications') || '[]');
    setMedications(storedMedications);
  }, [selectedDay]);

  async function loadSchedule(day: number) {
    try {
      const { data } = await axios.get(`http://localhost:8080/patient/1/schedule?day=${day}`);
      const allTimesOfDay = Object.keys(timeOfDayMap).map((key) => parseInt(key, 10));
      const scheduleWithDefaults = allTimesOfDay.map((timePeriod) => {
        const existingItem = data.find((item: ScheduleData) => item.time_period === timePeriod && item.day === day);
        return existingItem || { id: -1, day, hour: 0, minute: 0, time_period: timePeriod, taken: false, medications: [] };
      });
      setSchedule(scheduleWithDefaults);
    } catch (error) {
      console.error("Error loading schedule:", error);
    }
  }

  async function updateTime(timePeriod: number) {
    if (editHours < 0 || editHours > 23 || editMinutes < 0 || editMinutes > 59) {
      setToastMessage("Please enter valid hours (0-23) and minutes (0-59).");
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
        taken: existingItem?.taken || false,
        medications: existingItem?.medications || [],
      };

      if (existingItem?.id && existingItem.id !== -1) {
        await axios.put(`http://localhost:8080/patient/1/schedule/${existingItem.id}`, payload);
      } else {
        await axios.post(`http://localhost:8080/patient/1/schedule`, payload);
      }

      loadSchedule(selectedDay);
      setEditedId(-1);
      setToastMessage("Schedule updated successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error updating time:", error);
    }
  }

  async function deleteTime(id: number) {
    try {
      await axios.delete(`http://localhost:8080/patient/1/schedule/${id}`);
      loadSchedule(selectedDay);
      setShowModal(false);
      setToastMessage("Schedule deleted successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting time:", error);
    }
  }

  const handleMedicationStatus = (timePeriod: number, taken: boolean) => {
    const updatedSchedule = schedule.map(item =>
      item.time_period === timePeriod ? { ...item, taken } : item
    );
    setSchedule(updatedSchedule);
  };

  const handleAddMedications = (timePeriod: number) => {
    setCurrentTimePeriod(timePeriod);
    setShowAddMedicationModal(true);
  };

  const handleMedicationSelection = (medication: Medication) => {
    setSelectedMedications(prev => {
      const isSelected = prev.some(med => med.id === medication.id);
      if (isSelected) {
        return prev.filter(med => med.id !== medication.id);
      } else {
        return [...prev, medication];
      }
    });
  };

  const saveMedicationsToSchedule = () => {
    const updatedSchedule = schedule.map(item =>
      item.time_period === currentTimePeriod ? { ...item, medications: selectedMedications } : item
    );
    setSchedule(updatedSchedule);
    setShowAddMedicationModal(false);
    setSelectedMedications([]);
  };

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
                    onIonChange={(e) => setEditHours(parseInt(e.detail.value || "0", 10))}
                    placeholder="HH"
                    className="time-input"
                  />
                  :
                  <IonInput
                    type="number"
                    value={editMinutes}
                    onIonChange={(e) => setEditMinutes(parseInt(e.detail.value || "0", 10))}
                    placeholder="MM"
                    className="time-input"
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
                  <IonButton slot="end" onClick={() => handleAddMedications(item.time_period)}>
                    Add Medications
                  </IonButton>
                  <IonButton slot="end" className="edit-button" onClick={() => { setEditedId(item.time_period); setEditHours(item.hour); setEditMinutes(item.minute); }}>
                    <IonIcon icon={createOutline} />
                  </IonButton>
                  <IonButton slot="end" className="delete-button" onClick={() => { setDeleteScheduleId(item.id); setShowModal(true); }}>
                    <IonIcon icon={trashOutline} />
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

        <IonModal isOpen={showAddMedicationModal} onDidDismiss={() => setShowAddMedicationModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Medications</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {medications.map((medication) => (
                <IonItem key={medication.id}>
                  <IonLabel>{medication.name} - {medication.amount}</IonLabel>
                  <IonCheckbox
                    checked={selectedMedications.some(med => med.id === medication.id)}
                    onIonChange={() => handleMedicationSelection(medication)}
                  />
                </IonItem>
              ))}
            </IonList>
            <IonButton expand="block" onClick={saveMedicationsToSchedule}>
              Save
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddModifyPage;