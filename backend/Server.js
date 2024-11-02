require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chats = require("./data/Data");
const connectodb = require("./db/Dbconnect");
const colors = require("colors");
const router = require("./routes/User.routes");
const app = express();

app.use(express.json()); // Add parentheses here to call express.json()
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/chatapp", router);

const server = () => {
  connectodb();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
  });
};

server();
