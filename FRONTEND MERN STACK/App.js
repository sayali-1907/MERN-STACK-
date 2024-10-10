import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChartComponent from "./components/BarChart";

const App = () => {
  const [month, setMonth] = useState("3"); // Default month (March)
  const [searchTerm, setSearchTerm] = useState("");

  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="App">
      <h1>Transactions Dashboard</h1>

      {/* Month Selection Dropdown */}
      <div>
        <label>Select Month: </label>
        <select value={month} onChange={handleMonthChange}>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((name, idx) => (
            <option key={idx + 1} value={idx + 1}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Search Box */}
      <div>
        <input
          type="text"
          placeholder="Search by title, description, or price"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Components */}
      <TransactionsTable month={month} search={searchTerm} />
      <Statistics month={month} />
      <BarChartComponent month={month} />
    </div>
  );
};

export default App;
