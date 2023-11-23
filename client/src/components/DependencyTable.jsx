import React from "react";
import { useParams, Link } from "react-router-dom";

import "./DependencyTable.css";

function DependencyTable({ data, projectName }) {
  if (!data) {
    return null;
  }
  const columns = Object.keys(data).filter(
    (column) => column !== "ProjectName"
  );

  // Find the maximum length of the arrays in each column
  const maxArrayLength = Math.max(
    data.BSP.length,
    data.CommonServices.length,
    data.MaytronicsServices.length
  );

  const { projectName } = useParams();

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Project Name</th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(maxArrayLength)].map((_, index) => (
            <tr key={`row-${index}`}>
              <td>{index === 0 ? projectName : ""}</td>
              {columns.map((column) => (
                <td key={`${column}-${index}`}>{data[column][index] || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DependencyTable;
