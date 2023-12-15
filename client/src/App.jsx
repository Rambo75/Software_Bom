import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataTable from "./components/DataTable";
import DependencyTable from "./components/DependencyTable";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/data");
        const dataJson = await response.json();
        console.log(dataJson);
        setFetchedData(dataJson);
        setFilteredData(dataJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  if (isLoading)
    return (
      <div>
        <h2 className="loading">Loading...</h2>
      </div>
    );
  const filterData = filteredData.filter((data) =>
    data.project_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = async (projectName) => {
    try {
      // Make a request to your database API to get the dependencies for the selected project
      const response = await fetch(
        `http://localhost:5000/dependencies/${projectName}`
      );
      if (!response.ok) {
        // Handle error here if needed
        console.error("Error fetching dependencies:", response.statusText);
        return;
      }
      const data = await response.json();
    } catch (error) {
      // Handle error here if needed
      console.error("Error:", error);
    }
  };

  return (
    <Router>
      <div className="container">
        <h1>Maytronics Robot Projects</h1>
        <input
          className="input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <DataTable
                className="data-table"
                data={filterData}
                onProjectClick={handleProjectClick}
              />
            }
          />
          <Route
            path="/dependency/:projectName"
            element={<DependencyTable />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
