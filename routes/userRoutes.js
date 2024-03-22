// Import necessary modules and controllers
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth");
const UserController = require("../controllers/userController");
const { check } = require("express-validator");

// Define routes for users
router.post(
  "/login",
  [
    check("username").not().isEmpty(),
    check("username").isLength({ min: 3 }),
    check("password").not().isEmpty(),
  ],
  UserController.login
);
router.post(
  "/signup",
  [
    check("username").not().isEmpty(),
    check("username").isLength({ min: 3 }),
    check("password").not().isEmpty(),
  ],
  UserController.signup
);
router.get("/users/:id", checkAuth, UserController.getUserById);
router.put("/users/:id", checkAuth, UserController.updateUser);
router.delete("/users/:id", checkAuth, UserController.deleteUser);

// Export the router
module.exports = router;
