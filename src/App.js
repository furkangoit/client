import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Backend'den veri çek
    fetch('/api')
      .then(res => res.json())
      .then(data => setMessage(data.message));

    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="App">
      <h1>Frontend (3000) + Backend (5000)</h1>
      <p>{message}</p>
      <h2>Kullanıcılar:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;