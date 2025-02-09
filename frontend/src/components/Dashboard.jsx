// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import Header from './Header';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard');
        setData(response.data);
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
        setError(error.response?.data?.detail || 'Error fetching data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Data Insights</h2>

      {isLoading && <p className="text-gray-500">Loading insights...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <Plot
          data={data.charts}
          layout={{ title: "Data Insights", autosize: true }}
        />
      )}
      </div>
    </div>
  );
};

export default Dashboard;