// YourComponentWithRandomUsername.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../services/firebase';

const Random = () => {
  const [usernames, setUsernames] = useState([]);
  const [displayedUsername, setDisplayedUsername] = useState('');
  const [remainingUsernames, setRemainingUsernames] = useState([]);
  const [noMoreUsernames, setNoMoreUsernames] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const usersCollection = firestore.collection('users');
        const snapshot = await usersCollection.get();

        const usernamesData = snapshot.docs.map(doc => doc.data().username);

        setUsernames(usernamesData);
        setRemainingUsernames(usernamesData);
      } catch (error) {
        console.error('Error fetching usernames: ', error);
      }
    };

    fetchUsernames();
  }, []);

  const handleShowNextUsername = () => {

    if (remainingUsernames.length === 0) {
      setNoMoreUsernames(true);
      return;
    }

    let nextUsername;

    // Show "John" every 3rd time
    if (count === 2) {

      nextUsername = 'John';
      setCount(0);

    } else {

      // Get a random index from the remaining usernames
      const randomIndex = Math.floor(Math.random() * remainingUsernames.length);

      // Get the username at the random index
      nextUsername = remainingUsernames[randomIndex];

      // Increment the count for "John"
      setCount(count + 1);

    }

    // Remove the displayed username from the remaining usernames
    const updatedRemainingUsernames = remainingUsernames.filter(username => username !== nextUsername);

    setDisplayedUsername(nextUsername);
    setRemainingUsernames(updatedRemainingUsernames);
  };

  return (
    <div>
      <h1>Random Usernames from Firestore</h1>
      {noMoreUsernames ? (
        <p>No more usernames to display</p>
      ) : (
        <div>
          <p>Current Username: {displayedUsername}</p>
          <button onClick={handleShowNextUsername}>Show Next Username</button>
        </div>
      )}
    </div>
  );
};

export default Random;
