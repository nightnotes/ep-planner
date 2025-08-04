import { useState } from "react";

const users = {
  nuno: "1234",
  martijn: "5678",
};

const initialEPs = [
  { artist: "Artiest 1", deadline: "2025-08-04", owner: "nuno", done: false },
  { artist: "Artiest 2", deadline: "2025-08-11", owner: "nuno", done: false },
  { artist: "Artiest 3", deadline: "2025-08-18", owner: "nuno", done: false },
  { artist: "Artiest 4", deadline: "2025-08-25", owner: "nuno", done: false },
  { artist: "Artiest 5", deadline: "2025-09-01", owner: "nuno", done: false },
  { artist: "Artiest 6", deadline: "2025-09-08", owner: "martijn", done: false },
  { artist: "Artiest 7", deadline: "2025-09-15", owner: "martijn", done: false },
  { artist: "Artiest 8", deadline: "2025-09-22", owner: "martijn", done: false },
  { artist: "Artiest 9", deadline: "2025-09-29", owner: "martijn", done: false },
  { artist: "Artiest 10", deadline: "2025-10-06", owner: "martijn", done: false },
];

export default function EPPlannerApp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [eps, setEps] = useState(initialEPs);

  const handleLogin = () => {
    if (users[username.toLowerCase()] === password) {
      setLoggedInUser(username.toLowerCase());
    } else {
      alert("Verkeerde gebruikersnaam of wachtwoord");
    }
  };

  const handleDone = (index) => {
    const updated = [...eps];
    updated[index].done = true;
    setEps(updated);
  };

  if (!loggedInUser) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto' }}>
        <input
          type="text"
          placeholder="Gebruikersnaam"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <button onClick={handleLogin} style={{ padding: '10px 20px' }}>Inloggen</button>
      </div>
    );
  }

  const remainingEPs = eps.filter((ep) => ep.owner === loggedInUser && !ep.done);
  const current = remainingEPs[0];

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Welkom, {loggedInUser}</h1>
      {current ? (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '20px' }}>
          <p><strong>Artiest:</strong> {current.artist}</p>
          <p><strong>Deadline:</strong> {current.deadline}</p>
          <button onClick={() => handleDone(eps.indexOf(current))} style={{ marginTop: '10px' }}>✅ Afgevinkt</button>
        </div>
      ) : (
        <p>🎉 Alle EP's afgerond!</p>
      )}
      <h2 style={{ marginTop: '20px' }}>Overzicht:</h2>
      <ul>
        {eps
          .filter((ep) => ep.owner === loggedInUser)
          .map((ep, i) => (
            <li key={i} style={{ textDecoration: ep.done ? 'line-through' : 'none', color: ep.done ? '#888' : '#000' }}>
              {ep.artist} – {ep.deadline}
            </li>
          ))}
      </ul>
    </div>
  );
}