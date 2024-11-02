require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chats = require("./data/Data");

const app = express();

app.use(express.json()); // Add parentheses here to call express.json()
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the chat app API!");
});

app.get("/api/data", async (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  //   console.log(req.params.id);
  const singlechat = chats.find((c) => c._id === req.params.id);
  if (!singlechat) {
    return res.status(404).send("Chat not found");
  }
  res.send(singlechat);
});

const server = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

server();
