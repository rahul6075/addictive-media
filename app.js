const express = require("express");
require('dotenv').config()
const cors = require("cors");
const pool = require("./config/db");
const app = express();
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


// Routes
app.use("/api/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send("Api is running.");
});

app.listen(PORT, () => console.log(`Server is runnning  on ${PORT}.`));
