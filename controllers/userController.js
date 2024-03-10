const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Mentor = require("../models/mentorModel");
const HttpError = require("../models/http-error");

// Controller functions for users
const UserController = {
  getUserById: async (req, res, next) => {
    const userId = req.params.id;

    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not find user.",
        500
      );
      return next(error);
    }

    if (!user) {
      const error = new HttpError(
        "Could not find user for the provided id.",
        404
      );
      return next(error);
    }

    res.json({ user: user.toObject({ getters: true }) });
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        "Logging in failed, please try again later.",
        500
      );
      return next(error);
    }

    if (!existingUser) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      );
      return next(error);
    }

    if (!isValidPassword) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "your-secret-key",
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new HttpError(
        "Logging in failed, please try again later.",
        500
      );
      return next(error);
    }

    res.json({
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    });
  },
  signUp: async (req, res, next) => {
    const { username, email, password, role, specialization } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }

    if (existingUser) {
      const error = new HttpError(
        "User exists already, please login instead.",
        422
      );
      return next(error);
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError(
        "Could not create user, please try again.",
        500
      );
      return next(error);
    }

    const createdUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }

    if (role === "mentor") {
      const createdMentor = new Mentor({
        userId: createdUser._id,
        specialization,
      });

      try {
        await createdMentor.save();
      } catch (err) {
        const error = new HttpError(
          "Creating mentor failed, please try again.",
          500
        );
        return next(error);
      }
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email });
  },
  getTicketsByUserId: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateUser: async (req, res, next) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update user.",
        500
      );
      return next(error);
    }

    if (!user) {
      const error = new HttpError("User not found.", 404);
      return next(error);
    }

    user.username = username;
    user.email = email;

    try {
      await user.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update user.",
        500
      );
      return next(error);
    }

    res.json({ user: user.toObject({ getters: true }) });
  },
  deleteUser: async (req, res, next) => {
    const userId = req.params.id;

    let user;
    try {
      user = await User.findById(userId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete user.",
        500
      );
      return next(error);
    }

    if (!user) {
      const error = new HttpError("User not found.", 404);
      return next(error);
    }

    try {
      await user.remove();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete user.",
        500
      );
      return next(error);
    }

    res.json({ message: "User deleted." });
  },
};

module.exports = UserController;
