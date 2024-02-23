// Import necessary modules and controllers
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Define routes for users
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Export the router
module.exports = router;
