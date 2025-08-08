import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://disabled-voting-backend-1.onrender.com"; 

function App() {
  const [voter, setVoter] = useState({ voter_id: "", name: "", phone: "" });
  const [vote, setVote] = useState({ voter_id: "", choice: "" });
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(\`\${API_BASE}/register\`, voter);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Error");
    }
  };

  const handleVote = async () => {
    try {
      const res = await axios.post(\`\${API_BASE}/vote\`, vote);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.detail || "Error");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📝 Voter Registration</h2>
      <input placeholder="Voter ID" onChange={(e) => setVoter({ ...voter, voter_id: e.target.value })} /><br />
      <input placeholder="Name" onChange={(e) => setVoter({ ...voter, name: e.target.value })} /><br />
      <input placeholder="Phone" onChange={(e) => setVoter({ ...voter, phone: e.target.value })} /><br />
      <button onClick={handleRegister}>Register</button>

      <h2>🗳️ Submit Vote</h2>
      <input placeholder="Voter ID" onChange={(e) => setVote({ ...vote, voter_id: e.target.value })} /><br />
      <input placeholder="Vote Choice" onChange={(e) => setVote({ ...vote, choice: e.target.value })} /><br />
      <button onClick={handleVote}>Vote</button>

      <p style={{ color: "green" }}>{message}</p>
    </div>
  );
}

export default App;