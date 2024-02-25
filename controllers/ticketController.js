// Import the Ticket model
const Ticket = require("../models/ticketModel");
const fakeData = require("./fakeData");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

// Controller functions for tickets
const TicketController = {
  getTicketsByUserId: async (req, res) => {
    // Implement logic to get all tickets
  },
  getTicketById: async (req, res, next) => {
    // Implement logic to get ticket by ID
    let ticketId = req.params.tid;

    ticket = fakeData.DUMMY_TICKETS.find((t) => {
      return t.id === ticketId;
    });

    console.log("ticket: ", ticket, ticketId);

    if (!ticket) {
      return next(
        new HttpError("Could not find a ticket for the provided id.", 404)
      );
    }

    res.json(ticket);
  },
  createTicket: async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      throw new HttpError(
        "Invalid inputs passed, please check your data.",
        422
      );
    }

    const { title, description, creator } = req.body;

    const createdTicket = new Ticket({
      title,
      description,
      creator,
    });

    try {
      await createdTicket.save();
    } catch (err) {
      const error = new HttpError("Creating ticket failed", 500);
      return next(error);
    }

    res.status(201).json({ ticket: createdTicket });
  },
  updateTicket: async (req, res) => {
    // Implement logic to update a ticket
  },
  deleteTicket: async (req, res) => {
    // Implement logic to delete a ticket
  },
};

module.exports = TicketController;
