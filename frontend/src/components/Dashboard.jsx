// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard');
        setData(response.data);
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
        setError(error.response?.data?.detail || 'Error fetching data.');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <Plot
          data={data.charts}
          layout={{ title: 'Data Insights' }}
        />
      )}
    </div>
  );
};

export default Dashboard;