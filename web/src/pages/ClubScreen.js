import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000";

export default function ClubScreen() {
  const [round, setRound] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get(`${API}/rounds/current`);
      setRound(res.data);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!round) return <h1>No active round</h1>;

  return (
    <div>
      <h1>Club Screen</h1>
      {round.playlist.map(s => (
        <p key={s._id}>{s.title}</p>
      ))}
    </div>
  );
}