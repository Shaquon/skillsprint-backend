// Import necessary modules and controllers
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Define routes for users
router.get("/users", UserController.getAllUsers);
router.get("/login", UserController.login);
router.post("/signup", UserController.signUp);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Export the router
module.exports = router;
