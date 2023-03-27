const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Bro common put a name "],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [6, "Please provide your emali or i'll smack you with a fish."],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password is weak feed him some more characters."],
  },
});

const User = mongoose.Model("userdetail", UserSchema);

module.exports = User;
