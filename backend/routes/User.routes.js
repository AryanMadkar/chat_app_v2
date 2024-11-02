const express = require("express");

const router = express.Router();

// Import the chats data

const chats = require("../data/Data");
const {
  registerationuser,
  authuser,
} = require("../controllers/REgisteration.controllers");

// Get all chats

router.get("/", (req, res) => {
  res.send("Welcome to the chat app API!");
});

router.get("/api/data", (req, res) => {
  res.send(chats);
});

// Get a single chat by ID

router.get("/api/chat/:id", (req, res) => {
  const chat = chats.find((chat) => chat._id === req.params.id);

  if (!chat) {
    return res.status(404).send("Chat not found");
  }

  res.send(chat);
});
router.post("/register", registerationuser);
router.post("/login",authuser)

module.exports = router;
