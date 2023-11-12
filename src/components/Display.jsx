import React, { useEffect, useState } from 'react';
import { firestore } from '../services/firebase';

const Display = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = firestore.collection('users');
        const snapshot = await usersCollection.get();

        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          username: doc.data().username,
          password: doc.data().password,
        }));

        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Data from Firestore</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>Username:</strong> {user.username}, <strong>Password:</strong> {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
