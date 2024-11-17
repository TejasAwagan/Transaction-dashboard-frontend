import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { BASE_URL } from '../api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent = ({ selectedMonth }) => {
  const selectMonth = selectedMonth
  const [data, setData] = useState([]);

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pie-chart`, {
        params: { month: selectedMonth },
      });


      const transformedData = response.data.map((item) => ({
        name: item._id, 
        count: item.count,
      }));
      setData(transformedData);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  useEffect(() => {
    fetchPieChartData();
  }, [selectMonth]);

  return (
    <div>
      <h2>Pie Chart</h2>
      {data.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </div>
  );
};

export default PieChartComponent;
