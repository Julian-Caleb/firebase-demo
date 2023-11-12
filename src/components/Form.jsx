import React, { useState } from 'react';
import { firestore } from '../services/firebase';

const Form = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with a generated id to the "users" collection
      await firestore.collection('users').add({
        username: username,
        password: password,
      });

      // Clear the form after submitting
      setUsername('');
      setPassword('');

      console.log('User added to Firestore');
    } catch (error) {
      console.error('Error adding user to Firestore: ', error);
    }
  };

  return (
    <div>
      <h1>Add User to Firestore</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
