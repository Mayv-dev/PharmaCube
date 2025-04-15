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
  IonCheckbox,
  IonButtons,
  IonCard,
  IonCardContent,
  IonNote,
  IonChip,
  IonSkeletonText,
  IonBadge,
} from "@ionic/react";
import { 
  trashOutline, 
  createOutline, 
  checkmarkOutline, 
  closeOutline, 
  timeOutline, 
  checkmarkCircle, 
  closeCircle, 
  chevronBack, 
  calendarOutline,
  addCircleOutline,
  alertCircle,
  informationCircle
} from "ionicons/icons";
import axios from "axios";
import { ScheduleData, Medication } from "../../api types/types";
import { useColorblindFilter } from "../../colorBlindContext";
import { useHistory } from "react-router-dom";
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
  const [showAddMedicationModal, setShowAddMedicationModal] = useState<boolean>(false);
  const [selectedMedications, setSelectedMedications] = useState<Medication[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentTimePeriod, setCurrentTimePeriod] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const { filter } = useColorblindFilter();
  const history = useHistory();

  useEffect(() => {
    loadSchedule(selectedDay);
    loadMedications();
  }, [selectedDay]);

  async function loadSchedule(day: number) {
    setLoading(true);
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
        const existingItem = mockData.find((item) => item.time_period === timePeriod && item.day === day);
        return existingItem || { 
          id: -1, 
          day, 
          hour: 0, 
          minute: 0, 
          time_period: timePeriod, 
          taken: false, 
          medications: [] 
        };
      });
      setSchedule(scheduleWithDefaults);
      setLoading(false);
    } catch (error) {
      console.error("Error loading schedule:", error);
      setLoading(false);
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
      const updatedSchedule = schedule.map(item => {
        if (item.time_period === timePeriod) {
          return {
            ...item,
            hour: hours,
            minute: minutes
          };
        }
        return item;
      });
  
      setSchedule(updatedSchedule);
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

  const handleMedicationStatus = (timePeriod: number, taken: boolean) => {
    const updatedSchedule = schedule.map(item =>
      item.time_period === timePeriod ? { ...item, taken } : item
    );
    setSchedule(updatedSchedule);
  };

  const handleAddMedications = (timePeriod: number) => {
    const currentItem = schedule.find(item => item.time_period === timePeriod);
    setSelectedMedications(currentItem?.medications || []);
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
  };

  return (
    <IonPage className={filter}>
      <IonContent className="schedule-add-modify-content">
        <div className="app-container">
          <div className="welcome-section">
            <div className="welcome-content">
              <div className="back-button" onClick={() => history.push('/SchedulePage')}>
                <IonIcon icon={chevronBack} />
                <span>Back to Schedule</span>
              </div>
              <h1>Schedule Management</h1>
              <p>Add and modify your medication schedule</p>
              <div className="day-selector">
                {daysOfWeek.map((day) => (
                  <IonChip 
                    key={day} 
                    className={selectedDay === day ? "selected-day-chip" : "day-chip"}
                    onClick={() => setSelectedDay(day)}
                  >
                    <IonIcon icon={calendarOutline} />
                    <IonLabel>{getWeekdayName(day)?.substring(0, 3)}</IonLabel>
                  </IonChip>
                ))}
              </div>
            </div>
            <div className="welcome-decoration"></div>
          </div>

          <div className="schedule-section">
            <div className="section-header">
              <h2>Time Schedule</h2>
              <IonNote>Set medication times for {getWeekdayName(selectedDay)}</IonNote>
            </div>

            <IonCard className="schedule-card">
              <IonCardContent>
                {loading ? (
                  // Loading skeletons
                  Array(4).fill(0).map((_, index) => (
                    <div key={index} className="schedule-item-skeleton">
                      <IonSkeletonText animated style={{ width: '60%' }} />
                      <IonSkeletonText animated style={{ width: '40%' }} />
                    </div>
                  ))
                ) : (
                  <IonList className="schedule-list">
                    {schedule.map((item) => (
                      <IonItem key={item.time_period} className="schedule-item" button detail={false}>
                        {editedId === item.time_period ? (
                          <div className="edit-time-container">
                            <div className="time-input-group">
                              <IonInput
                                type="number"
                                value={editHours}
                                onIonChange={(e) => setEditHours(e.detail.value || "")}
                                placeholder={timePadding(item.hour)}
                                className="time-input"
                                min="0"
                                max="23"
                              />
                              <span className="time-separator">:</span>
                              <IonInput
                                type="number"
                                value={editMinutes}
                                onIonChange={(e) => setEditMinutes(e.detail.value || "")}
                                placeholder={timePadding(item.minute)}
                                className="time-input"
                                min="0"
                                max="59"
                              />
                            </div>
                            <div className="edit-actions">
                              <IonButton fill="clear" className="confirm-edit-button" onClick={() => updateTime(item.time_period)}>
                                <IonIcon icon={checkmarkOutline} />
                              </IonButton>
                              <IonButton fill="clear" className="cancel-edit-button" onClick={() => setEditedId(-1)}>
                                <IonIcon icon={closeOutline} />
                              </IonButton>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="schedule-item-content">
                              <div className="time-period">
                                <IonIcon icon={timeOutline} className="time-icon" />
                                <div className="time-details">
                                  <h3>{timeOfDayMap[item.time_period]}</h3>
                                  <p className="time">{timePadding(item.hour)}:{timePadding(item.minute)}</p>
                                </div>
                              </div>
                              {item.medications && item.medications.length > 0 ? (
                                <div className="medications-list">
                                  {item.medications.map((medication) => (
                                    <div key={medication.id} className="medication-item">
                                      <IonChip color="primary" className="medication-chip">
                                        <IonLabel>{medication.name} - {medication.amount}</IonLabel>
                                      </IonChip>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="no-medications">
                                  <IonIcon icon={informationCircle} />
                                  <p>No medications scheduled</p>
                                </div>
                              )}
                            </div>
                            <div className="schedule-actions">
                              <IonButton fill="clear" className="add-medication-button" onClick={() => handleAddMedications(item.time_period)}>
                                <IonIcon icon={addCircleOutline} />
                                <span>Add</span>
                              </IonButton>
                              <IonButton fill="clear" className="edit-button" onClick={() => { 
                                setEditedId(item.time_period); 
                                setEditHours(item.hour.toString());
                                setEditMinutes(item.minute.toString());
                              }}>
                                <IonIcon icon={createOutline} />
                              </IonButton>
                              {item.id !== -1 && (
                                <IonButton fill="clear" className="delete-button" onClick={() => { 
                                  setDeleteScheduleId(item.id); 
                                  setShowModal(true); 
                                }}>
                                  <IonIcon icon={trashOutline} />
                                </IonButton>
                              )}
                              <IonButton
                                fill="clear"
                                className={`status-button ${item.taken ? "taken" : "not-taken"}`}
                                onClick={() => handleMedicationStatus(item.time_period, !item.taken)}
                              >
                                <IonIcon icon={item.taken ? checkmarkCircle : closeCircle} />
                              </IonButton>
                            </div>
                          </>
                        )}
                      </IonItem>
                    ))}
                  </IonList>
                )}
              </IonCardContent>
            </IonCard>
          </div>
        </div>

        <IonModal isOpen={showAddMedicationModal} onDidDismiss={() => setShowAddMedicationModal(false)} className="medication-modal">
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton fill="clear" onClick={() => setShowAddMedicationModal(false)}>
                  <IonIcon slot="icon-only" icon={chevronBack} />
                </IonButton>
              </IonButtons>
              <IonTitle>Add Medications</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="modal-container">
              <div className="section-header">
                <h2>Select Medications</h2>
                <IonNote>Choose medications for {timeOfDayMap[currentTimePeriod]}</IonNote>
              </div>
              <IonList className="medication-selection-list">
                {medications.length > 0 ? (
                  medications.map((medication) => (
                    <IonItem key={medication.id} button detail={false} className="medication-selection-item">
                      <IonLabel>
                        <h3>{medication.name}</h3>
                        <p>{medication.amount}</p>
                      </IonLabel>
                      <IonCheckbox
                        checked={selectedMedications.some(med => med.id === medication.id)}
                        onIonChange={() => handleMedicationSelection(medication)}
                      />
                    </IonItem>
                  ))
                ) : (
                  <div className="empty-state">
                    <IonIcon icon={informationCircle} />
                    <p>No medications available</p>
                  </div>
                )}
              </IonList>
              <div className="modal-actions">
                <IonButton expand="block" className="save-button" onClick={saveMedicationsToSchedule}>
                  Save Medications
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="delete-modal">
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonTitle>Confirm Deletion</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="modal-container">
              <div className="delete-confirmation">
                <IonIcon icon={alertCircle} className="alert-icon" />
                <h2>Delete Schedule Item</h2>
                <p>Are you sure you want to delete this schedule item? This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <IonButton expand="block" color="danger" className="delete-button" onClick={() => {
                  deleteTime(deleteScheduleId);
                  setShowModal(false);
                }}>
                  Delete
                </IonButton>
                <IonButton expand="block" fill="outline" className="cancel-button" onClick={() => setShowModal(false)}>
                  Cancel
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ScheduleAddModifyPage;