const express = require("express");
const data = require("./config/data.json");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const pool = require("./config/db");
const upload = require("./config/storage");
const app = express();
const fs = require("fs");
const path = require("path");
const uploadPath = "./uploads"
// Middle wares
app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const PORT = 3000;
//Connect Local Database
pool.getConnection(function (err, conn) {
  // Do something with the connection
  if (err) throw err;
  console.log("Database Connected");
});
// add countries
app.post("/api/add", (req, res) => {
  const countries = req.body; // Array of countries' data

  if (!Array.isArray(countries) || countries.length === 0) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const values = countries.map((country) => [country.name, country.code]);

  const query = "INSERT INTO countries (name, code) VALUES ?";

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool", err);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.query(query, [values], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error("Error executing query", error);
        return res.status(500).json({ error: "Database query error" });
      }

      return res.status(200).json({ message: "Records inserted successfully" });
    });
  });
});

// Upload Route
app.post("/upload/:id", upload.single("testImg"), async (req, res) => {
  const file = req.file;
  let q = "UPDATE user SET image=? WHERE id = ?";
  pool.query(q, [file.filename, Number(req.params.id)], (err, data) => {
    if (err) return res.json(err);
    console.log("file uploaded");
    return res.status(200).json({
      message: "File uploaded.",
      image: file.filename,
    });
  });
});

// retrive file 
app.get("/retrieve/:id", async (req, res) => {
  let q = "SELECT image FROM user WHERE id = ?";
  pool.query(q, [Number(req.params.id)], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const filename = data[0].image;
    const filePath = path.join(uploadPath, filename);

    fs.readFile(filePath, (err, fileData) => {
      if (err) return res.json(err);

      const base64Data = Buffer.from(fileData).toString("base64");
      const imageSrc = `data:image/png;base64,${base64Data}`;

      return res.status(200).json({
        message: "File retrieved.",
        image: imageSrc,
      });
    });
  });
});


// Routes
app.use("/api/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("Api is running.");
});

app.listen(PORT, () => console.log(`Server is runnning  on ${PORT}.`));
