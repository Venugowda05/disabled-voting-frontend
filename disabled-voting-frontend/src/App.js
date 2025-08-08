import React from 'react';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Disabled Voter Portal</h1>
      <form onSubmit={(e) => { e.preventDefault(); alert("Vote submitted!"); }}>
        <label htmlFor="voterId">Voter ID:</label><br/>
        <input type="text" id="voterId" name="voterId" required /><br/><br/>

        <label htmlFor="proof">Disability Proof (upload):</label><br/>
        <input type="file" id="proof" name="proof" accept="image/*" required /><br/><br/>

        <label>Choose Candidate:</label><br/>
        <input type="radio" name="candidate" value="A" required /> Candidate A<br/>
        <input type="radio" name="candidate" value="B" /> Candidate B<br/><br/>

        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
}

export default App;