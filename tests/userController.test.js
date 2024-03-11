const UserController = require("../controllers/userController");
const User = require("../models/userModel");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mock the User model and dependencies
jest.mock("../models/userModel");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("User Controller", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new user", async () => {
    console.log("running again!");
    const req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password",
        role: "user",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    const savedUser = {
      _id: {
        toString: jest.fn().mockReturnValue("user-id"),
      },
      username: "testuser",
      email: "test@example.com",
      role: "user",
    };

    User.findOne.mockResolvedValueOnce(null);
    bcrypt.hash.mockResolvedValueOnce("hashed-password");
    User.mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce(savedUser),
    });

    await UserController.signup(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.hash).toHaveBeenCalledWith("password", 12);
    expect(User).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
      password: "hashed-password",
      role: "user",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      userId: "user-id",
      email: "test@example.com",
    });
  });

  it("should log in a user with valid credentials", async () => {
    const req = {
      body: {
        email: "test@example.com",
        password: "password",
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    const user = {
      _id: "user-id",
      email: "test@example.com",
      password: "hashed-password",
    };

    User.findOne.mockResolvedValueOnce(user);
    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce("token");

    await UserController.login(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashed-password");
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: "user-id", email: "test@example.com" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    expect(res.json).toHaveBeenCalledWith({
      userId: "user-id",
      email: "test@example.com",
      token: "token",
    });
  });

  it("should return user details for a valid user ID", async () => {
    const req = {
      params: {
        id: "user-id",
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    const user = {
      _id: "user-id",
      email: "test@example.com",
      toObject: jest
        .fn()
        .mockReturnValue({ id: "user-id", email: "test@example.com" }),
    };

    User.findById.mockResolvedValueOnce(user);

    await UserController.getUserById(req, res, next);

    expect(User.findById).toHaveBeenCalledWith("user-id");
    expect(res.json).toHaveBeenCalledWith({
      user: { id: "user-id", email: "test@example.com" },
    });
  });

  it("should update user details for a valid user ID", async () => {
    const req = {
      params: {
        id: "user-id",
      },
      body: {
        username: "updateduser",
        email: "updated@example.com",
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    const user = {
      _id: "user-id",
      username: "testuser",
      email: "test@example.com",
      save: jest.fn(),
      toObject: jest.fn().mockReturnValue({
        id: "user-id",
        username: "updateduser",
        email: "updated@example.com",
      }),
    };

    User.findById.mockResolvedValueOnce(user);

    await UserController.updateUser(req, res, next);

    expect(User.findById).toHaveBeenCalledWith("user-id");
    expect(user.username).toBe("updateduser");
    expect(user.email).toBe("updated@example.com");
    expect(user.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      user: {
        id: "user-id",
        username: "updateduser",
        email: "updated@example.com",
      },
    });
  });

  it("should delete a user for a valid user ID", async () => {
    const req = {
      params: {
        id: "user-id",
      },
    };
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();
    const user = {
      _id: "user-id",
      remove: jest.fn(),
    };

    User.findById.mockResolvedValueOnce(user);

    await UserController.deleteUser(req, res, next);

    expect(User.findById).toHaveBeenCalledWith("user-id");
    expect(user.remove).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: "User deleted." });
  });

  // Add more test cases for error scenarios, edge cases, etc.
});
