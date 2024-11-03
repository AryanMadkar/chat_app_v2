const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const usermodel = require("../model/USermodel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token is not provided" });
      }
      const decoded = jwt.verify(token, process.env.key);
      req.user = await usermodel.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurred while protecting route" });
    console.error("Error occurred while protecting route:", error);
  }
});

module.exports = protect;