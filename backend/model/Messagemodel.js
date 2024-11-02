const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "Chat",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

const messagemodel = mongoose.model("Message", messageSchema);

module.exports = messagemodel;
