import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [ballots, setBallots] = useState([]);
  const [selectedBallot, setSelectedBallot] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [voterId, setVoterId] = useState("");
  const [receipt, setReceipt] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch all ballots when page loads
  useEffect(() => {
    axios
      .get(`${API_URL}/ballots`)
      .then((res) => setBallots(res.data))
      .catch((err) => console.error("Error fetching ballots:", err));
  }, [API_URL]);

  // Handle voting
  const handleVote = () => {
    if (!voterId) {
      alert("Please enter your Voter ID");
      return;
    }
    if (!selectedBallot || !selectedOption) {
      alert("Please select a ballot and an option");
      return;
    }

    setLoading(true);
    axios
      .post(`${API_URL}/vote`, {
        voter_id: voterId,
        choice: parseInt(selectedOption)
      })
      .then((res) => {
        setReceipt(res.data.message || "Vote submitted successfully");
        setSelectedOption("");
      })
      .catch((err) => {
        console.error("Error submitting vote:", err);
        alert(err.response?.data?.detail || "Error submitting vote");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Online Voting System</h1>

      {/* Voter ID */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Voter ID:{" "}
          <input
            type="text"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            placeholder="Enter your voter ID"
          />
        </label>
      </div>

      {/* Ballot selection */}
      <div>
        <label>
          Select Ballot:
          <select
            value={selectedBallot || ""}
            onChange={(e) => setSelectedBallot(parseInt(e.target.value))}
          >
            <option value="">-- Select --</option>
            {ballots.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Ballot options */}
      {selectedBallot && (
        <div style={{ marginTop: "20px" }}>
          <p>Options:</p>
          {ballots
            .find((b) => b.id === selectedBallot)
            ?.options?.map((opt) => (
              <label key={opt.id} style={{ display: "block" }}>
                <input
                  type="radio"
                  name="voteOption"
                  value={opt.id}
                  checked={parseInt(selectedOption) === opt.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                {opt.text}
              </label>
            ))}
        </div>
      )}

      {/* Submit vote */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleVote} disabled={loading}>
          {loading ? "Submitting..." : "Submit Vote"}
        </button>
      </div>

      {/* Receipt */}
      {receipt && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <strong>{receipt}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
