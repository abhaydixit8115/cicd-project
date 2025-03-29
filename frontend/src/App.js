import React, { useState } from "react";
import axios from "axios";

const App = () => {
  // State management
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [cacheInfo, setCacheInfo] = useState(null);
  const [message, setMessage] = useState("");

  // Save user to DB
  const handleSaveUser = async () => {
    try {
      const response = await axios.post("http://localhost:3001/save", {
        username,
        email,
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Error saving user!");
    }
  };

  // Get user info from DB
  const handleGetUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get/${username}`);
      setUserInfo(response.data);
    } catch (err) {
      setUserInfo(null);
      setMessage("User not found!");
    }
  };

  // Get application status
  const handleGetStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/status");
      setStatus(response.data.status);
    } catch (err) {
      setStatus("Error fetching status!");
    }
  };

  // Save user to both DB and Cache
  const handleCacheSave = async () => {
    try {
      const response = await axios.post("http://localhost:3001/cache-save", {
        username,
        email,
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Error saving to cache!");
    }
  };

  // Get user data from Cache or DB
  const handleGetFromCache = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/get-cache/${username}`
      );
      setCacheInfo(response.data);
    } catch (err) {
      setCacheInfo(null);
      setMessage("Error fetching from cache!");
    }
  };

  return (
    <div className="App">
      <h1>React Frontend for User Management</h1>

      {/* Save User to DB */}
      <div>
        <h3>Save User</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSaveUser}>Save User</button>
      </div>

      {/* Get User from DB */}
      <div>
        <h3>Get User</h3>
        <input
          type="text"
          placeholder="Enter Username to fetch"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleGetUser}>Get User</button>
        {userInfo && (
          <div>
            <h4>User Info from DB:</h4>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
          </div>
        )}
      </div>

      {/* Get Application Status */}
      <div>
        <h3>Application Status</h3>
        <button onClick={handleGetStatus}>Get Status</button>
        {status && <p>Status: {status}</p>}
      </div>

      {/* Save User to Cache & DB */}
      <div>
        <h3>Save User to Cache & DB</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCacheSave}>Save to Cache & DB</button>
      </div>

      {/* Get User from Cache or DB */}
      <div>
        <h3>Get User from Cache or DB</h3>
        <input
          type="text"
          placeholder="Enter Username to fetch from Cache/DB"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleGetFromCache}>Get from Cache/DB</button>
        {cacheInfo && (
          <div>
            <h4>User Info:</h4>
            <p>Source: {cacheInfo.source}</p>
            <p>Username: {cacheInfo.data.username}</p>
            <p>Email: {cacheInfo.data.email}</p>
          </div>
        )}
      </div>

      {/* Display messages */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
