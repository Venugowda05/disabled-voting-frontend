import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [ballots, setBallots] = useState([]);
  const [selectedBallot, setSelectedBallot] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [receipt, setReceipt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/ballots`)
      .then((res) => setBallots(res.data))
      .catch((err) => console.error("Error fetching ballots:", err));
  }, []);

  const handleVote = () => {
    if (!selectedBallot || !selectedOption) {
      alert("Please select a ballot and an option");
      return;
    }
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ballots/${selectedBallot}/vote`, {
        option: selectedOption
      })
      .then((res) => {
        setReceipt(res.data.receipt);
        setSelectedOption("");
      })
      .catch((err) => {
        console.error("Error submitting vote:", err);
        alert("Error submitting vote");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Online Voting System</h1>

      <div>
        <label>
          Select Ballot:
          <select
            value={selectedBallot || ""}
            onChange={(e) => setSelectedBallot(e.target.value)}
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
                  checked={selectedOption === opt.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                {opt.text}
              </label>
            ))}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleVote} disabled={loading}>
          {loading ? "Submitting..." : "Submit Vote"}
        </button>
      </div>

      {receipt && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <strong>Vote submitted successfully!</strong>
          <p>Your receipt: {receipt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
