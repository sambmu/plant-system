import React, { useEffect, useState } from 'react';
import Charts from './Charts'; // Assume this is the graph component you created
import Dashboard from './Dashboard'; // Import the Dashboard component

function App() {
  const [data, setData] = useState(0);

  useEffect(() => {
    fetch('/data') // Adjust the endpoint as needed
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("There was an error!", error));
  }, []);

  return (
    <div className="App" style={{ fontFamily: 'Courier' }}>
      <h1 style={{ textAlign: 'center' }}>Autonomous Plant Watering System Gateway</h1>
      <Dashboard /> {/* Incorporate the Dashboard component here */}
      <Charts />
    </div>
  );
}

export default App;
