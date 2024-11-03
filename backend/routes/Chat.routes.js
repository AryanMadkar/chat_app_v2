const express = require("express");
const protect = require("../middleware/Auth.middleware");
const {
  accesschats,
  fetchchats,
  getgroupchats,
  renamegroup,
  removefromgroup,
  addtogroup,
} = require("../controllers/Chat.controllers");

const chatrouter = express.Router();
chatrouter.post("/", protect, accesschats);
chatrouter.get("/", protect, fetchchats);
chatrouter.post("/group", protect, getgroupchats);
chatrouter.put("/rename", protect, renamegroup);
chatrouter.put("/remove", protect, removefromgroup);
chatrouter.put("/add", protect, addtogroup);

module.exports = chatrouter;
