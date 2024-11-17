import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChartComponent from "./components/BarChartComponent";
import PieChartComponent from "./components/PieChartComponent";
import "./App.css";
const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");

  return (
    <div className="container">
      <h1>MERN Transactions Dashboard</h1>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <Statistics selectedMonth={selectedMonth} />
      <div className="chart-container">
        <BarChartComponent selectedMonth={selectedMonth} />
        {/* <PieChartComponent selectedMonth={selectedMonth} /> */}
      </div>
      <TransactionsTable selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
