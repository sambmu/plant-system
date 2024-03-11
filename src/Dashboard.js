import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Hardcoded data for moisture level in milliliters (ml)
const mlData = [
  { name: '0:00', ml: 5 },
  { name: '0:30', ml: 10 },
  { name: '1:00', ml: 0 },
  { name: '1:30', ml: 1 },
  { name: '2:00', ml: 3 },
  { name: '2:30', ml: 20 },
  { name: '3:00', ml: 14 },
  { name: '3:30', ml: 20 },
  { name: '4:00', ml: 15 },
  { name: '4:30', ml: 11 },
  { name: '5:00', ml: 6 },
  { name: '5:30', ml: 2 },
  { name: '6:00', ml: 3 },
  { name: '6:30', ml: 12 },
  { name: '7:00', ml: 4 },
  { name: '7:30', ml: 11 },
  { name: '8:00', ml: 3 },
  { name: '8:30', ml: 9 },
  { name: '9:00', ml: 12 },
  { name: '9:30', ml: 15 },
  { name: '10:00', ml: 11 },
  { name: '10:30', ml: 19 },
  { name: '11:00', ml: 5 },
  { name: '11:30', ml: 18 },
  { name: '12:00', ml: 4 },
  { name: '12:30', ml: 6 },
  { name: '13:00', ml: 15 },
  { name: '13:30', ml: 17 },
  { name: '14:00', ml: 19 },
  { name: '14:30', ml: 5 },
  { name: '15:00', ml: 7 },
  { name: '15:30', ml: 14 },
  { name: '16:00', ml: 2 },
  { name: '16:30', ml: 19 },
  { name: '17:00', ml: 8 },
  { name: '17:30', ml: 19 },
  { name: '18:00', ml: 14 },
  { name: '18:30', ml: 19 },
  { name: '19:00', ml: 17 },
  { name: '19:30', ml: 14 },
  { name: '20:00', ml: 14 },
  { name: '20:30', ml: 1 },
  { name: '21:00', ml: 14 },
  { name: '21:30', ml: 19 },
  { name: '22:00', ml: 4 },
  { name: '22:30', ml: 7 },
  { name: '23:00', ml: 13 },
  { name: '23:30', ml: 11 }
];

// List of moisture percentages to display randomly
const moisturePercentages = [39.8, 40.0, 40.4, 39.9, 39.5];
function LiveDateTime() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
    useEffect(() => {
      const timerId = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
  
      return () => clearInterval(timerId);
    }, []);
  
    return (
      <div>
        <p><strong>Current Date and Time:</strong> {currentDateTime.toLocaleString()}</p>
      </div>
    );
  }
function RandomMoistureGauge() {
  // State to store the current moisture percentage
  const [percentage, setPercentage] = useState(moisturePercentages[0]);

  useEffect(() => {
    // Update the percentage every few seconds with a random value from moisturePercentages
    const interval = setInterval(() => {
      setPercentage(moisturePercentages[Math.floor(Math.random() * moisturePercentages.length)]);
    }, 3000); // Update interval is set to 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
    </div>
  );
}

function Dashboard() {
  // Dashboard details like plant type, number of plants, etc.
  const plantType = "Snake Plant";
  const numberOfPlants = 5;
  const lastWatered = "2023-03-10 08:00";
  const [zoneMoistureLevels, setZoneMoistureLevels] = useState({
    zone1: moisturePercentages[0],
    zone2: moisturePercentages[0],
    zone3: moisturePercentages[0]
  });
    
  useEffect(() => {
    const interval = setInterval(() => {
      setZoneMoistureLevels({
        zone1: moisturePercentages[Math.floor(Math.random() * moisturePercentages.length)],
        zone2: moisturePercentages[Math.floor(Math.random() * moisturePercentages.length)],
        zone3: moisturePercentages[Math.floor(Math.random() * moisturePercentages.length)]
      });
    }, 5000); // Update interval is set to 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>Plant Moisture Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div>
          <h2>Plant Information</h2>
          <p><strong>Type of Plants:</strong> {plantType}</p>
          <p><strong>Number of Plants:</strong> {numberOfPlants}</p>
          <p><strong>Last Watered:</strong> {lastWatered}</p>
        </div>
        <div>
          <h2>Current Soil Moisture Levels</h2>
          {/* Display for current soil moisture levels or sensor data */}
          <p><strong>Zone 1:</strong> {zoneMoistureLevels.zone1}%</p>
          <p><strong>Zone 2:</strong> {zoneMoistureLevels.zone2}%</p>
          <p><strong>Zone 3:</strong> {zoneMoistureLevels.zone3}%</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mlData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Moisture Level (ml)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ml" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <h2 style={{ marginTop: '20px' }}>Live Moisture Percentage</h2>
      <RandomMoistureGauge />
    </div>
  );
}

export default Dashboard;
