const asyncHandler = require("express-async-handler");
const usermodel = require("../model/USermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generatetoken(id) {
  if (!id) {
    return null;
  }
  return jwt.sign({ id }, process.env.key, { expiresIn: "7d" });
}

const registerationuser = asyncHandler(async (req, res) => {
  try {
    let { name, email, password, profilePicture } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (profilePicture === null || profilePicture.length === 0) {
      profilePicture = "https://avatar.iran.liara.run/public/boy";
    }
    const newUser = await usermodel.create({
      name,
      email,
      password: hashedPassword,
      profilePicture,
    });

    res.status(201).json({
      message: "User registered successfully",
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      token: generatetoken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
    console.error("Error registering user:", error);
  }
});

const authuser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generatetoken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: token, // Correctly use the generated token
    });
  } catch (error) {
    res.status(500).json({ message: "Error authenticating user" });
    console.error("Error authenticating user:", error);
  }
});

module.exports = { registerationuser, authuser };
