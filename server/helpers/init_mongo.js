const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_LOCAL);
    console.log("MongoDB connected Successfully.");
  } catch (error) {
    console.log(error.message);
  }
})(); // This is an IIFE : Immediately Invoked Function expression.

/**
 * IFFE : who needs function names and then invoke that function.IFFE is capable of its anonymity and
 * the ability to call itself on its own.
 */
