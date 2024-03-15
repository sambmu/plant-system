import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// List of moisture percentages to display randomly
const moisturePercentages = [39.8, 40.0, 40.4, 39.9, 39.5];

// Hardcoded data for moisture level in milliliters (ml) based on moisturePercentages for the last 24 half hours
const mlData = moisturePercentages.map((percentage, index) => ({
  name: `${index * 0.5}:00`,
  ml: percentage,
}));

// Simplified linear regression calculation
function simpleLinearRegression(data) {
  const n = data.length;
  let meanX = 0, meanY = 0, num = 0, den = 0;

  data.forEach((point, i) => {
    meanX += i;
    meanY += point.ml;
  });

  meanX /= n;
  meanY /= n;

  data.forEach((point, i) => {
    num += (i - meanX) * (point.ml - meanY);
    den += (i - meanX) ** 2;
  });

  const m = num / den;
  const b = meanY - m * meanX;

  return { m, b };
}

const { m, b } = simpleLinearRegression(mlData);

// Function to predict future values
function predictNext24Hours(m, b, startHour) {
  const predictions = [];
  for (let i = startHour; i < startHour + 24; i++) {
    predictions.push({
      name: `${i}:00`,
      ml: m * i + b,
    });
  }
  return predictions;
}

// Predicting the next 24 hours using the linear model
const forecastData = predictNext24Hours(m, b, mlData.length);

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
    const [percentage, setPercentage] = useState(30);
  
    useEffect(() => {
      const updateFrequency = 1000; // Update every 100ms for smooth transition
      const totalDuration = 15000; // Total duration to go from 10 to 50
      const steps = totalDuration / updateFrequency; // Number of steps to go from 10 to 50
      const incrementPerStep = (50 - 30) / steps; // Increment per step
  
      const interval = setInterval(() => {
        setPercentage((prev) => {
          // Restart the loop if percentage reaches 50
          if (prev >= 50) return 30;
          return prev + incrementPerStep;
        });
      }, updateFrequency);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div style={{ width: '200px', height: '200px' }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage.toFixed(1)}%`}
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
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>Plant Moisture Dashboard</h1>
      <LiveDateTime />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <RandomMoistureGauge />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mlData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ml" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <h2 style={{ marginTop: '20px' }}>Moisture Level Forecast (Next 24 Hours)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ml" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
