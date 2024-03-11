import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
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
function exportCSVFile(items, fileTitle) {
  const headers = {
    name: 'Time',
    ml: 'Water Usage (mL)'
  };

  const csv = [Object.keys(headers).join(','), ...items.map(item => `${item.name},${item.ml}`)].join('\n');
  const exportedFilename = fileTitle + '.csv' || 'export.csv';
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportedFilename);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilename);
      document.body.appendChild(link); // Required for FF
      link.click();
      document.body.removeChild(link);
    }
  }
}

function Charts() {
  const handleExport = () => {
    exportCSVFile(data, 'water_usage_data');
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ml" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <button onClick={handleExport} style={{ marginTop: '20px' }}>Export Water Usage Data</button>
    </div>
  );
}

export default Charts;