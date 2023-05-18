require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

//home route
app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
