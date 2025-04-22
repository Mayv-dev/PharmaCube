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
  IonModal,
  IonToast,
  IonCheckbox,
  IonButtons,
  IonCard,
  IonCardContent,
  IonNote,
  IonChip,
  IonSkeletonText,
  IonBackButton,
  useIonViewDidEnter,
  isPlatform
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
import '../../daltonization.css';

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
  const [editError, setEditError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState<number>(-1);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showAddMedicationModal, setShowAddMedicationModal] = useState<boolean>(false);
  const [selectedMedications, setSelectedMedications] = useState<Medication[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentTimePeriod, setCurrentTimePeriod] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const { daltonization } = useColorblindFilter();
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isPlatform('mobile'));
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useIonViewDidEnter(() => {
    // Ensure proper scroll behavior on mobile
    const content = document.querySelector('ion-content') as HTMLIonContentElement;
    if (content) {
      content.scrollToTop(300);
    }
  });

  useEffect(() => {
    loadSchedule(selectedDay);
    loadMedications();
  }, [selectedDay]);

  async function loadSchedule(day: number) {
    setLoading(true);
    try {
      // Default times for each period
      const defaultTimes: Record<number, { hour: number; minute: number }> = {
        1: { hour: 8, minute: 0 },    // Morning
        2: { hour: 12, minute: 0 },   // Afternoon
        3: { hour: 18, minute: 0 },   // Evening
        4: { hour: 22, minute: 0 }    // Night
      };

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
          hour: defaultTimes[timePeriod].hour, 
          minute: defaultTimes[timePeriod].minute, 
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
    
    // Reset error state
    setEditError("");
    
    // Validate hours
    if (isNaN(hours) || hours < 0 || hours > 23) {
      setEditError("Hours must be between 0 and 23");
      setShowToast(true);
      return;
    }
    
    // Validate minutes
    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
      setEditError("Minutes must be between 0 and 59");
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
      setEditHours("");
      setEditMinutes("");
      setToastMessage("Time updated successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error updating time:", error);
      setEditError("Error updating time");
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

  const handleTimeEdit = (timePeriod: number, item: ScheduleData) => {
    setEditError("");
    // Ensure minutes are properly padded when editing
    const paddedMinutes = item.minute < 10 ? `0${item.minute}` : item.minute.toString();
    setEditHours(item.hour.toString());
    setEditMinutes(paddedMinutes);
    setEditedId(timePeriod);
  };

  const handleTimeInput = (value: string, type: 'hours' | 'minutes') => {
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (type === 'hours') {
      // For hours, only allow values between 0-23
      const numValue = parseInt(numericValue);
      if (numericValue === '' || (numValue >= 0 && numValue <= 23)) {
        setEditHours(numericValue);
      }
    } else {
      // For minutes, handle empty input and validate range
      if (numericValue === '') {
        setEditMinutes('');
        return;
      }
      
      const numValue = parseInt(numericValue);
      if (numValue >= 0 && numValue <= 59) {
        // Pad single digits with leading zero
        const paddedValue = numValue < 10 ? `0${numValue}` : numValue.toString();
        setEditMinutes(paddedValue);
      } else if (numValue > 59) {
        // If value is greater than 59, set to 59
        setEditMinutes('59');
      }
    }
  };

  return (
    <IonPage className={`${daltonization} daltonization-active`}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="schedule-add-modify-content">
        <div className="app-container">
          {!isMobile && (
            <div className="welcome-section">
              <div className="welcome-content">
                <p>Set up and manage your medication schedule</p>
              </div>
              <div className="welcome-decoration"></div>
            </div>
          )}

          <div className="schedule-section">
            <div className="section-header">
              <h2>Time Schedule for {getWeekdayName(selectedDay)}</h2>
              <IonNote>Set medication times for each period</IonNote>
            </div>

            <div className="day-selector">
              {daysOfWeek.map((day) => (
                <div 
                  key={day} 
                  className={selectedDay === day ? "selected-day-chip" : "day-chip"}
                  onClick={() => setSelectedDay(day)}
                >
                  {!isMobile && <IonIcon icon={calendarOutline} />}
                  <IonLabel>{isMobile ? getWeekdayName(day).slice(0, 3) : getWeekdayName(day)}</IonLabel>
                </div>
              ))}
            </div>

            {loading ? (
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
                            onIonChange={(e) => handleTimeInput(e.detail.value || "", 'hours')}
                            placeholder={timePadding(item.hour)}
                            className="time-input"
                            min="0"
                            max="23"
                            inputmode="numeric"
                            pattern="[0-9]*"
                          />
                          <span className="time-separator">:</span>
                          <IonInput
                            type="number"
                            value={editMinutes}
                            onIonChange={(e) => handleTimeInput(e.detail.value || "", 'minutes')}
                            placeholder={timePadding(item.minute)}
                            className="time-input"
                            min="0"
                            max="59"
                            inputmode="numeric"
                            pattern="[0-9]*"
                          />
                        </div>
                        {editError && (
                          <IonNote color="danger" className="edit-error">
                            {editError}
                          </IonNote>
                        )}
                        <div className="edit-buttons">
                          <IonButton 
                            fill="clear" 
                            className="confirm-edit-button" 
                            onClick={() => updateTime(item.time_period)}
                            size={isMobile ? "large" : "default"}
                          >
                            <IonIcon icon={checkmarkOutline} />
                          </IonButton>
                          <IonButton 
                            fill="clear" 
                            className="cancel-edit-button" 
                            onClick={() => {
                              setEditedId(-1);
                              setEditHours("");
                              setEditMinutes("");
                              setEditError("");
                            }}
                            size={isMobile ? "large" : "default"}
                          >
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
                          <IonButton 
                            fill="clear" 
                            className="add-medication-button" 
                            onClick={() => handleAddMedications(item.time_period)}
                            size={isMobile ? "large" : "default"}
                          >
                            <IonIcon icon={addCircleOutline} />
                            {!isMobile && <span>Add</span>}
                          </IonButton>
                          <IonButton 
                            fill="clear" 
                            className="edit-button" 
                            onClick={() => handleTimeEdit(item.time_period, item)}
                            size={isMobile ? "large" : "default"}
                          >
                            <IonIcon icon={createOutline} />
                          </IonButton>
                          <IonButton
                            fill="clear"
                            className={`status-button ${item.taken ? "taken" : "not-taken"}`}
                            onClick={() => handleMedicationStatus(item.time_period, !item.taken)}
                            size={isMobile ? "large" : "default"}
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
          </div>
        </div>

        <IonModal isOpen={showAddMedicationModal} onDidDismiss={() => setShowAddMedicationModal(false)} className="medication-modal">
          <IonHeader className="ion-no-border">
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowAddMedicationModal(false)}>
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
              
              {medications.length > 0 ? (
                <IonList className="medication-selection-list">
                  {medications.map((medication) => (
                    <IonItem key={medication.id} button detail={false} className="medication-selection-item">
                      <IonLabel>
                        <h3>{medication.name}</h3>
                        <p>{medication.amount}</p>
                      </IonLabel>
                      <IonCheckbox
                        slot="end"
                        checked={selectedMedications.some(med => med.id === medication.id)}
                        onIonChange={() => handleMedicationSelection(medication)}
                      />
                    </IonItem>
                  ))}
                </IonList>
              ) : (
                <div className="empty-state">
                  <IonIcon icon={informationCircle} />
                  <p>No medications available</p>
                </div>
              )}
              
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