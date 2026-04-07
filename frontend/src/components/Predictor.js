import React, { useState } from 'react';
import axios from 'axios';

const Predictor = ({ supabase }) => {
  const [form, setForm] = useState({ hours: '', attendance: '', score: '' });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/predict`, form);
      setResult(response.data.result);
    } catch (err) {
      setError('Error predicting. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Predict Student Performance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Study Hours</label>
          <input type="number" name="hours" value={form.hours} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block">Attendance (%)</label>
          <input type="number" name="attendance" value={form.attendance} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block">Assignment Score</label>
          <input type="number" name="score" value={form.score} onChange={handleChange} className="w-full p-2 border" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 w-full" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      {result && <p className="mt-4 text-center text-xl">Result: {result}</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Predictor;