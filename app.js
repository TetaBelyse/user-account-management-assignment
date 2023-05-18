require("dotenv").config();
const express = require("express");
const db = require("./db/database");
const cors = require("cors");
const app = express();

// Body parser
app.use(express.json({ limit: "50mb" }));
//cors
app.use(cors());

// Connect to db
db();

//home route
app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

const usersRoute = require("./routes/users");

app.use("/api/users/", usersRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
