import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DependencyTable from "./DependencyTable"; // Import the new component
import "./DataTable.css";

function DataTable({ data }) {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(null);
  const [extractedData, setExtractedData] = useState(null); // New state variable
  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleProjectClick = (project) => {
    setActiveProject(project);
    if (project) {
      const extractedData = extractDependencies(
        project.dependencies,
        project.version
      );
      console.log("Extracted Data:", extractedData);
      // setExtractedData(
      //   extractDependencies(project.dependencies, project.version)

      setExtractedData(extractedData);
      // navigate(`/dependency/${project.project_name}`);
    }
  };

  const extractDependencies = (dependencies, version) => {
    const extractedData = {
      BSP: extractArray(dependencies.BSP),
      CommonServices: extractArray(dependencies.CommonServices),
      MaytronicsServices: extractArray(dependencies.MaytronicsServices),
      version: version,
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
        <DependencyTable
          project={activeProject}
          // onBackClick={handleBackClick}
        />
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
            {sortedData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                {/* Use index to generate ascending IDs */}
                <td>
                  <button
                    onClick={() => handleProjectClick(item)}
                    className={`${activeProject === item ? "active" : ""}`}
                  >
                    {item.project_name}
                  </button>
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
