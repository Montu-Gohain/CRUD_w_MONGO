const User = require("../models/Models.js");
const CreateError = require("http-errors");
const JWT = require("jsonwebtoken");

const GetallUsers = async (req, res, next) => {
  try {
    const allusers = await User.find();
    if (!allusers) {
      return next(
        CreateError.BadRequest("Something went wrong,please try again later.")
      );
    }
    res.status(200).send(allusers);
  } catch (error) {
    next(error);
  }
};
const AddNewuser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      CreateError.BadRequest("Please provide All the required Fields")
    );
  }
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();

    if (!result) {
      return next(
        CreateError.BadRequest("Something went wrong, please try again later.")
      );
    }
    res.status(201).json({
      message: "New user created successfully.",
      result,
    });
  } catch (error) {
    next(error);
  }
};
const LoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(CreateError.BadRequest("Please provide all required fields."));
  }
  try {
    const userfound = await User.findOne({ email });
    if (!userfound) {
      return next(CreateError.Unauthorized("Invalid Credentials"));
    }

    const isPasswordMatching = await userfound.isValidPassword(password);

    if (!isPasswordMatching) {
      return next(CreateError.Unauthorized("Invalid Credentials"));
    }
    console.log(userfound);
    const accessToken = JWT.sign(
      { name: userfound.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120s" }
    );

    const refreshToken = JWT.sign(
      { name: userfound.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "10h" }
    );

    res.status(200).json({
      message: "User Logged In Successfully.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
const UpdateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const updates = name;
    const options = { new: true };
    const newName = await User.findOneAndUpdate(
      { email: email },
      { name: updates },
      options
    );

    if (!newName) {
      return next(
        CreateError.BadRequest("Something went wrong, please try again later.")
      );
    }
    res.send(newName);
  } catch (error) {
    next(error);
  }
};
const DeleteUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const deleting = await User.findOneAndDelete({ email });

    if (!deleting) {
      next(
        CreateError.BadRequest("Something went wrong,please try again later.")
      );
    }
    res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { GetallUsers, AddNewuser, UpdateUser, DeleteUser, LoginUser };
