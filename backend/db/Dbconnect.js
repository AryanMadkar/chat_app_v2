const mongoose = require("mongoose");

const connectodb = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${response.connection.host}`.cyan.underline);
  } catch (error) {
    console.error("Failed to connect to MongoDB".red.bold, error);
    process.exit(1);
  }
};

module.exports = connectodb;
