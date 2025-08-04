
import React, { useState } from 'react';

const users = {
  nuno: '123!',
  martijn: '123!',
};

const calmSleepTasks = [
  { artist: 'Muted Mind', date: '2025-08-12' },
  { artist: 'Drowsy Daydreams', date: '2025-08-15' },
  { artist: 'Cloud Notes', date: '2025-08-19' },
];

const adhdSleepTasks = [
  { artist: 'Dreamflow', date: '2025-08-25', owner: 'nuno' },
  { artist: 'Poluz', date: '2025-08-26', owner: 'martijn' },
  { artist: 'Doris Lost', date: '2025-09-08', owner: 'nuno' },
  { artist: 'Eternal', date: '2025-09-09', owner: 'martijn' },
];

const boosters = [
  { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { quote: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { quote: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
  { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
];

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [boosterIndex, setBoosterIndex] = useState(0);

  const handleLogin = () => {
    if (users[username.toLowerCase()] === password) {
      setLoggedInUser(username.toLowerCase());
    } else {
      alert('Incorrect username or password');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setUsername('');
    setPassword('');
  };

  const toggleTask = (artist) => {
    setCompleted((prev) =>
      prev.includes(artist) ? prev.filter((a) => a !== artist) : [...prev, artist]
    );
  };

  const showNextBooster = () => {
    setBoosterIndex((prev) => (prev + 1) % boosters.length);
  };

  if (!loggedInUser) {
    return (
      <div style={{ padding: 30, textAlign: 'center' }}>
        <h1>Night Notes EP-Planner</h1>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  const userADHDTaks = adhdSleepTasks.filter((t) => t.owner === loggedInUser);

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {loggedInUser.charAt(0).toUpperCase() + loggedInUser.slice(1)}</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Calm & Sleep Releases</h3>
      <ul>
        {calmSleepTasks.map(({ artist, date }) => (
          <li key={artist}>
            <label>
              <input
                type="checkbox"
                checked={completed.includes(artist)}
                onChange={() => toggleTask(artist)}
              />
              {artist} – {date}
            </label>
          </li>
        ))}
      </ul>

      <h3>ADHD Sleep Releases</h3>
      <ul>
        {userADHDTaks.map(({ artist, date }) => (
          <li key={artist}>
            <label>
              <input
                type="checkbox"
                checked={completed.includes(artist)}
                onChange={() => toggleTask(artist)}
              />
              {artist} – {date}
            </label>
          </li>
        ))}
      </ul>

      <h3>💡 Business Booster</h3>
      <blockquote>
        <em>"{boosters[boosterIndex].quote}"</em><br />
        — {boosters[boosterIndex].author}
      </blockquote>
      <button onClick={showNextBooster}>Next quote</button>
    </div>
  );
}
