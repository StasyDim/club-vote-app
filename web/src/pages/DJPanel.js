import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000";

export default function DJPanel() {
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const addSongToPlaylist = (song) => setPlaylist([...playlist, song]);

  const startRound = async () => {
    await axios.post(`${API}/rounds`, { playlist: playlist.map(s => s._id) });
    alert("Round started!");
  };

  return (
    <div>
      <h2>DJ Panel</h2>
      <div>
        <h3>Create Playlist</h3>
        {songs.map(s => (
          <div key={s._id}>
            {s.title} <button onClick={() => addSongToPlaylist(s)}>Add</button>
          </div>
        ))}
      </div>
      <button onClick={startRound}>Start Round</button>
    </div>
  );
}