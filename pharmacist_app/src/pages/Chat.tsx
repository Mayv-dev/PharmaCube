import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonLoading,
  IonSearchbar,
} from '@ionic/react';
import '../styles/Users.css';


const Users: React.FC = () => {
  const [patientList, setPatientList] = useState([{ username: "Ann Murphy" }])
  const [filteredUsers, setFilteredUsers] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    setFilteredUsers(patientList);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredUsers(patientList);
    } else {
      const filtered = patientList.filter((user: any) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <IonPage>

      <IonContent className="ion-padding">
        <div className='webBody'>
          <IonSearchbar
            className="search-bar"
            value={searchQuery}
            onIonInput={(e: any) => handleSearch(e.target.value)}
            placeholder="Search for a user..."
          />
          <IonList>
            {filteredUsers.map((user: any) => (
              <IonItem routerLink="/chat/patient" routerDirection='root' key={user.id}>
                <IonLabel >
                  <img width="10%" src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'></img>
                  <h2>{user.username}</h2>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Users;



