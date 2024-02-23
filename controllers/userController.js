// Import the User model
const User = require("../models/userModel");

// Controller functions for users
const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getTicketsByUserId: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
    } catch(error) {
      res.status(400).json({message: error.message})
    }
  },
  updateUser: async (req, res) => {
    // Implement logic to update a user
  },
  deleteUser: async (req, res) => {
    // Implement logic to delete a user
  },
};

module.exports = UserController;
