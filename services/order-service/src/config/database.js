const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri);

    console.log("Order Service MongoDB connected successfully");
  } catch (error) {
    console.error("Order Service MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connectDatabase;