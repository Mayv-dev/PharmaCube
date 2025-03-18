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
import LowerToolbar from '../components/LowerToolbar';


const Users: React.FC = () => {
  const [patientList, setPatientList] = useState([{ username: "Ann Murphy" }, { username: "Aaron Murphy" }, { username: "Irene Duffy" }])
  const [filteredUsers, setFilteredUsers] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);


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

      <IonContent>
        <div className='formBody'>
          <IonSearchbar
            className="search-bar"
            value={searchQuery}
            onIonInput={(e: any) => handleSearch(e.target.value)}
            placeholder="Search for a user..."
          />
          <IonList>
            {filteredUsers.map((user: any) => (
              <IonItem href="/chat/patient" key={user.id}>
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



