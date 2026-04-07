import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import Predictor from './components/Predictor';
import Dashboard from './components/Dashboard';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

function App() {
  const [page, setPage] = useState('predictor');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-white text-xl">Student Performance Predictor</h1>
          <div>
            <button onClick={() => setPage('predictor')} className="text-white mr-4">Predictor</button>
            <button onClick={() => setPage('dashboard')} className="text-white">Dashboard</button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        {page === 'predictor' ? <Predictor supabase={supabase} /> : <Dashboard supabase={supabase} />}
      </div>
    </div>
  );
}

export default App;