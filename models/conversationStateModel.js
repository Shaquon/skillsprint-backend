// models/conversationStateModel.js

const mongoose = require("mongoose");

const conversationStateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  currentState: {
    type: String,
    required: true,
    enum: ["TITLE", "DESCRIPTION"], // Add more states as needed
    default: "TITLE",
  },
  ticketInfo: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    // Add more fields as needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ConversationState = mongoose.model(
  "ConversationState",
  conversationStateSchema
);

module.exports = ConversationState;
