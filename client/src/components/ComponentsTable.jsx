// import React, { useState } from "react";
// import "./DataTable.css";

// function ComponentsTable({ project, backButton }) {
//   // const [extractedData, setExtractedData] = useState([]);

//   const dependencies = project.dependencies;
//   return (
//     <div>
//       <h2>Component Detailes</h2>
//       <button onClick={backButton}>Back</button>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Project Name</th>
//             {Object.keys(dependencies).map((dependencyType) => (
//               <th key={dependencyType}>{dependencyType}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{project.project_name}</td>
//             {Object.keys(dependencies).map((dependencyType) => (
//               <td key={dependencyType}>
//                 <ul>
//                   {dependencies[dependencyType].map((dependency, index) => (
//                     <li key={index}>{dependency}</li>
//                   ))}
//                 </ul>
//               </td>
//             ))}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ComponentsTable;
