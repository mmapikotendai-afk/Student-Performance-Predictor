import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = ({ supabase }) => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ total: 0, pass: 0, fail: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('predictions').select('*');
    if (error) console.error(error);
    else {
      setData(data);
      const pass = data.filter(d => d.result === 'Pass').length;
      const fail = data.filter(d => d.result === 'Fail').length;
      setStats({ total: data.length, pass, fail });
    }
  };

  const pieData = [
    { name: 'Pass', value: stats.pass },
    { name: 'Fail', value: stats.fail }
  ];

  const barData = [
    { name: 'Pass', hours: data.filter(d => d.result === 'Pass').reduce((a, b) => a + b.hours, 0) / stats.pass || 0, attendance: data.filter(d => d.result === 'Pass').reduce((a, b) => a + b.attendance, 0) / stats.pass || 0, score: data.filter(d => d.result === 'Pass').reduce((a, b) => a + b.score, 0) / stats.pass || 0 },
    { name: 'Fail', hours: data.filter(d => d.result === 'Fail').reduce((a, b) => a + b.hours, 0) / stats.fail || 0, attendance: data.filter(d => d.result === 'Fail').reduce((a, b) => a + b.attendance, 0) / stats.fail || 0, score: data.filter(d => d.result === 'Fail').reduce((a, b) => a + b.score, 0) / stats.fail || 0 }
  ];

  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3>Total Predictions</h3>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Pass Rate</h3>
          <p className="text-2xl">{stats.total ? ((stats.pass / stats.total) * 100).toFixed(1) : 0}%</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Fail Rate</h3>
          <p className="text-2xl">{stats.total ? ((stats.fail / stats.total) * 100).toFixed(1) : 0}%</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3>Pass vs Fail</h3>
          <PieChart width={400} height={300}>
            <Pie data={pieData} cx={200} cy={150} outerRadius={80} fill="#8884d8" dataKey="value">
              <Cell fill="#00C49F" />
              <Cell fill="#FF8042" />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Average Metrics by Result</h3>
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hours" fill="#8884d8" />
            <Bar dataKey="attendance" fill="#82ca9d" />
            <Bar dataKey="score" fill="#ffc658" />
          </BarChart>
        </div>
      </div>
      <div className="mt-8">
        <h3>Prediction History</h3>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2">Hours</th>
              <th className="p-2">Attendance</th>
              <th className="p-2">Score</th>
              <th className="p-2">Result</th>
              <th className="p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                <td className="p-2">{d.hours}</td>
                <td className="p-2">{d.attendance}</td>
                <td className="p-2">{d.score}</td>
                <td className="p-2">{d.result}</td>
                <td className="p-2">{new Date(d.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;