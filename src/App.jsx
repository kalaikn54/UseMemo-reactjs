import React, { useState, useEffect, useMemo } from 'react';
import './App.css'; // Import the CSS file

const App = () => {
  const [users, setUsers] = useState([]); // Store API data
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [count, setCount] = useState(0); // New state for unrelated actions

  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data); // Save API data to state
    };
    fetchUsers();
  }, []);

  // Filtered users with useMemo
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]); // Recalculate only when `users` or `searchTerm` changes

  return (
    <div className="container">
      <h1 className="title">Fetch and Filter Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <ul className="list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="list-item">
            {user.name}
          </li>
        ))}
      </ul>

      <button className="button" onClick={() => setCount(count + 1)}>
        Increment Count: {count}
      </button>
    </div>
  );
};

export default App;
