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
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://67580653c0a427baf94f0cd8.mockapi.io/users/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user: any) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <IonPage>

      <IonContent>
        <IonSearchbar
          className="search-bar"
          value={searchQuery}
          onIonInput={(e: any) => handleSearch(e.target.value)}
          placeholder="Search for a user..."
        />
        {loading ? (
          <IonLoading isOpen={loading} message={'Loading users...'} />
        ) : (
          <IonList>
            {filteredUsers.map((user: any) => (
              <IonItem key={user.id}>
                <IonLabel>
                  <h2>{user.username}</h2>
                  <p>Medication: {user.medication}</p>
                  <p>Amount: {user.amount}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Users;



