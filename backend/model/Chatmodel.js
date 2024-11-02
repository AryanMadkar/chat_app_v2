const mongoose = require("mongoose");

// creating chat schema

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, required: true, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestmessages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const chatmodels = mongoose.model("Chat", chatSchema);

module.exports = chatmodels;
