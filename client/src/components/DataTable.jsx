import React, { useState } from "react";
import DependencyTable from "./DependencyTable"; // Import the new component
import { Link } from "react-router-dom";
import "./DataTable.css";

function DataTable() {
  const handleProjectClick = (project) => {
    setActiveProject(project);
    if (project) {
      setExtractedData(extractDependencies(project.dependencies));
    }
  };

  const extractDependencies = (dependencies) => {
    const extractedData = {
      BSP: extractArray(dependencies.BSP),
      CommonServices: extractArray(dependencies.CommonServices),
      MaytronicsServices: extractArray(dependencies.MaytronicsServices),
    };
    return extractedData;
  };

  const extractArray = (array) => {
    return array.map((element) => {
      const name = element.split("(")[1].split(".")[0];
      return name; // Extract text within parentheses
    });
  };

  return (
    <div>
      {activeProject ? (
        <DependencyTable project={activeProject} />
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Project Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Version</th>
              <th>Configuration</th>
              {/* <th>Dependencies</th> */}
              <th>Bsp Commit ID</th>
              <th>Maytronics Commit ID</th>
              <th>Commonservices Commit ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                {/* Use index to generate ascending IDs */}
                <td>
                  <Link
                    to={`/dependency/${item.project_name}`}
                    className={`${activeProject === item ? "active" : ""}`}
                    onClick={() => handleProjectClick(item)}
                  >
                    {item.project_name}
                  </Link>
                </td>

                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.version}</td>
                <td>{item.configuration}</td>
                {/* <td>{item.dependencies}</td> */}
                <td>{item.bsp_commit_id}</td>
                <td>{item.maytronics_commit_id}</td>
                <td>{item.commonservices_commit_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {extractedData && (
        <DependencyTable
          data={extractedData}
          projectName={activeProject ? activeProject.project_name : ""}
        />
      )}
    </div>
  );
}

export default DataTable;
