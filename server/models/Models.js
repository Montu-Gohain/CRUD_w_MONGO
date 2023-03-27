const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Bro common put a name "],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [
        6,
        "Please provide your emali or i'll smack you with a fish.",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password is weak feed him some more characters."],
    },
  },
  { versionKey: false }
);

UserSchema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(10); //Generating 10 rounds.Increasing round will make encryption more powerful yet it requires more time to do so.
    this.password = await bcrypt.hash(this.password, salt);

    //* Before saving it will encrypt the password
  } catch (error) {
    console.log(error);
  }
});

UserSchema.methods.comparePassword = async function (givenpassword) {
  try {
    const isMatch = await bcrypt.compare(givenpassword, this.password);
    return isMatch;
  } catch (error) {
    console.log(error.message);
  }
};

const User = model("userdetail", UserSchema);

module.exports = User;
