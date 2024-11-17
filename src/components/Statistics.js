import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api";

const Statistics = ({ selectedMonth }) => {
  const [stats, setStats] = useState({});

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/transactions/statistics`, {
        params: { month: selectedMonth },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div className="card-deck">
      <div className="card">
        <h5 className="card-title">Total Sales</h5>
        <p className="card-text">${stats.totalSales}</p>
      </div>
      <div className="card">
        <h5 className="card-title">Sold Items</h5>
        <p className="card-text">{stats.soldCount}</p>
      </div>
      <div className="card">
        <h5 className="card-title">Unsold Items</h5>
        <p className="card-text">{stats.unsoldCount}</p>
      </div>
    </div>
  );
};

export default Statistics;
