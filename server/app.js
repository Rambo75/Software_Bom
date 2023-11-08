const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const URI = process.env.URI;

const dbname = "ProjectData";

// Connection to MongoDB
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(URI, {
      useUnifiedTopology: true,
    });
    console.log("Connect to Database");
    return client.db(dbname);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  }
}
// Get dependencies by project name
app.get("/dependencies/:projectName", async (req, res) => {
  try {
    const projectName = req.params.projectName;
    const db = await connectToDatabase();
    const collection = db.collection("MyData");

    const project = await collection.findOne({ project_name: projectName });
    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or no dependencies available." });
    }

    const dependencies = project.dependencies || [];
    res.status(200).json(dependencies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get project by name
app.post("/data", async (req, res) => {
  try {
    const projectName = req.body.projectName;
    const db = await connectToDatabase();
    const collection = db.collection("MyData");
    const data = await collection.find({ project_name: projectName }).toArray();
    console.log(data);
    if (!data.length) {
      return res.status(404).json({ message: "project name not exist!" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

// Get all the data from the database
app.get("/data", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("MyData");
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//Get 'configuration' per project
app.get("/configurations/:projectName", async (req, res) => {
  try {
    const projectName = req.params.projectName;
    const db = await connectToDatabase();
    const collection = db.collection("MyData");

    const configurations = await collection
      .find(
        { project_name: projectName },
        { projection: { _id: 0, configuration: 1 } }
      )
      .toArray();

    if (configurations.length === 0) {
      return res
        .status(404)
        .json({ message: "Project not found or no configuration available." });
    }

    res.status(200).json(configurations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST Endpoint to Retrieve Project Names
app.post("/projectNames", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("MyData");
    const projectNames = await collection.distinct("project_name");

    res.status(200).json(projectNames);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Delete projects by project name
app.delete("/data/:projectName", async (req, res) => {
  try {
    const projectName = req.params.projectName;
    const db = await connectToDatabase();
    const collection = db.collection("MyData");

    const result = await collection.deleteOne({ project_name: projectName });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Project not found for deletion." });
    }

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
