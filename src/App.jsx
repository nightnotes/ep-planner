import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <div className="max-w-sm mx-auto mt-20 space-y-4">
        <Input placeholder="Gebruikersnaam" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type="password" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Inloggen</Button>
      </div>
    );
  }

  const remainingEPs = eps.filter((ep) => ep.owner === loggedInUser && !ep.done);
  const current = remainingEPs[0];

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Welkom, {loggedInUser}</h1>
      {current ? (
        <Card>
          <CardContent className="p-4 space-y-2">
            <p><strong>Artiest:</strong> {current.artist}</p>
            <p><strong>Deadline:</strong> {current.deadline}</p>
            <Button onClick={() => handleDone(eps.indexOf(current))}>✅ Afgevinkt</Button>
          </CardContent>
        </Card>
      ) : (
        <p>🎉 Alle EP's afgerond!</p>
      )}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Overzicht</h2>
        <ul className="space-y-1">
          {eps
            .filter((ep) => ep.owner === loggedInUser)
            .map((ep, i) => (
              <li key={i} className={ep.done ? "line-through text-gray-500" : ""}>
                {ep.artist} – {ep.deadline}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}