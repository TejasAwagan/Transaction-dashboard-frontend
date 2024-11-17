import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { BASE_URL } from '../api';
import Loader from "react-js-loader";

const BarChartComponent = ({ selectedMonth }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBarChartData = async () => {
    try {
      setLoading(true);
      console.log('Fetching data for month:', selectedMonth);
      const response = await axios.get(`${BASE_URL}/bar-chart`, { params: { month: selectedMonth } });

      console.log('API Response:', response.data);

      const transformedData = response.data.map((item) => ({
        range: item._id,
        count: item.count,
      }));

      console.log('Transformed Data:', transformedData);
      setData(transformedData);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarChartData();
  }, [selectedMonth]);

  return (
    <div style={{ margin: '20px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Bar Chart</h2>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#888' }}><Loader type="spinner-circle" bgColor='red ' color='red' title={"Loading.."} size={80} /></p>
      ) : data.length > 0 ? (
        <BarChart
          width={700}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" label={{ value: 'Price Range', position: 'insideBottom', offset: -6 }} />
          <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="count" fill="#4a90e2" barSize={40} />
        </BarChart>
      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default BarChartComponent;
