const express = require("express");

const router = express.Router();

// Import the chats data

const {
  registerationuser,
  authuser,
  allusers,
} = require("../controllers/REgisteration.controllers");
const protect = require("../middleware/Auth.middleware");

// Get all chats

router.post("/register", registerationuser);
router.post("/login", authuser);
router.get("/allusers", protect, allusers);
module.exports = router;
