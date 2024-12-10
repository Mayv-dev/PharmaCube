// import React, { useState } from 'react';
// import {
//   IonPage,
//   IonContent,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonIcon,
//   IonTabBar,
//   IonTabButton,
//   IonBadge,
//   IonItem,
//   IonLabel,
//   IonList,
//   IonSearchbar,
// } from '@ionic/react';
// import { menu, notifications, people, medkit, settings } from 'ionicons/icons';
// import './Users.css'; 

// const Users: React.FC = () => {
//   // Mock Data for Users
//   const mockUsers = [
//     { id: 1, username: 'marco', medication: 'Aspirin', amount: 20 },
//     { id: 2, username: 'tiao', medication: 'Ibuprofen', amount: 15 },
//     { id: 3, username: 'cian', medication: 'Paracetamol', amount: 10 },
//     { id: 4, username: 'jordan', medication: 'Amoxicillin', amount: 5 },
//   ];

//   const [searchQuery, setSearchQuery] = useState(''); // State to store search query
//   const [filteredUsers, setFilteredUsers] = useState(mockUsers); // State for filtered user list

//   // Handle Search
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filtered = mockUsers.filter((user) =>
//       user.username.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   };

//   return (
//     <IonPage>
//       {/* Tab Bar at the Top */}
//       <IonTabBar slot="top">
//         <IonTabButton tab="tab1" href="/tab1">
//           <IonIcon icon={medkit} />
//           <IonLabel>Medications</IonLabel>
//         </IonTabButton>
//         <IonTabButton tab="users" href="/users">
//           <IonIcon icon={people} />
//           <IonLabel>Users</IonLabel>
//         </IonTabButton>
//         <IonTabButton tab="settings" href="/settings">
//           <IonIcon icon={settings} />
//           <IonLabel>Settings</IonLabel>
//         </IonTabButton>
//       </IonTabBar>

//       {/* Header */}
//       <IonHeader>
//         <IonToolbar>
//           <IonIcon slot="start" icon={menu} style={{ fontSize: '24px', padding: '8px' }} />
//           <IonTitle style={{ textAlign: 'center' }}>Users</IonTitle>
//           <IonIcon slot="end" icon={notifications} style={{ fontSize: '24px', padding: '8px' }}>
//             <IonBadge color="danger" style={{ fontSize: '12px', marginLeft: '-10px' }}>
//               3
//             </IonBadge>
//           </IonIcon>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent className="ion-padding">
//         {/* Search Bar */}
//         <IonSearchbar
//           className="search-bar" // Apply the CSS class
//           placeholder="Search for a user..."
//           value={searchQuery}
//           onIonInput={(e: any) => handleSearch(e.target.value)} // Update filteredUsers on input
//         />

//         {/* User List */}
//         <IonList>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user) => (
//               <IonItem key={user.id}>
//                 <IonLabel>
//                   <h3>{user.username}</h3>
//                   <p>Medication: {user.medication}</p>
//                   <p>Amount: {user.amount}</p>
//                 </IonLabel>
//               </IonItem>
//             ))
//           ) : (
//             <IonItem>
//               <IonLabel>No users found</IonLabel>
//             </IonItem>
//           )}
//         </IonList>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Users;

import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonLoading,
  IonSearchbar,
  IonIcon,
} from '@ionic/react';
import { menu, notifications } from 'ionicons/icons';
import './Users.css';

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
      <IonHeader>
        <IonToolbar>
          <IonIcon className="hamburger-icon" icon={menu} />
          <IonTitle className="center-title">Users</IonTitle>
          <IonIcon className="notification-icon" icon={notifications} />
        </IonToolbar>
      </IonHeader>
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



