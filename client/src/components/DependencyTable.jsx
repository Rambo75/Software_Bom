import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "./DataTable.css";
import "./DependencyTable.css";

function DependencyTable({ data, projectName }) {
  const navigate = useNavigate();
  console.log("DependencyTable received data:", data);
  if (!data) {
    return null;
  }
  const columns = Object.keys(data).filter(
    (column) => column !== "ProjectName" && column !== "version"
  );

  // Find the maximum length of the arrays in each column
  const maxArrayLength = Math.max(
    data.BSP.length,
    data.CommonServices.length,
    data.MaytronicsServices.length
  );

  const goBackPage = () => {
    window.location.reload(false);
  };

  return (
    <div className="table-container">
      <button onClick={() => goBackPage()}>Go back</button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Version</th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(maxArrayLength)].map((_, index) => (
            <tr key={`row-${index}`}>
              <td>{index === 0 ? projectName : ""}</td>
              <td>{data.version}</td>
              {columns.map((column) => (
                <td key={`${column}-${index}`}>{data[column][index] || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link to="/">Back to Data Table</Link>
      </div>
    </div>
  );

  DependencyTable.default.Props = {
    data: {
      BSP: [],
      CommonServices: [],
      MaytronicsServices: [],
    },
    projectName: "",
  };
}

export default DependencyTable;
