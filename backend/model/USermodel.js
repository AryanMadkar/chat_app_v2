const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://avatar.iran.liara.run/public/boy",
    },
  },
  { timestamps: true }
);

const usermodel = mongoose.model("User", userschema);

module.exports = usermodel;
