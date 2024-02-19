import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Point1', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Point2', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Point3', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Point4', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Point5', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Point6', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Point7', uv: 349, pv: 4300, amt: 2100 },
];

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr)
  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
      items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = convertToCSV(items);
  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

function Charts() {
  const handleExport = () => {
    exportCSVFile(null, data, 'moisture_data');
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip 
            wrapperStyle={{ backgroundColor: '#222', borderColor: '#444' }} 
            labelStyle={{ color: '#ccc' }}
            itemStyle={{ color: '#ccc' }}
          />
          <Legend wrapperStyle={{ color: '#ccc' }} />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <button onClick={handleExport} style={{ marginTop: '20px' }}>Export Moisture Data</button>
    </div>
  );
}

export default Charts;