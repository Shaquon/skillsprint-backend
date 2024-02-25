// Import the Ticket model
const Ticket = require("../models/ticketModel");
const fakeData = require("./fakeData");
const HttpError = require("../models/http-error");

// Controller functions for tickets
const TicketController = {
  getAllTickets: async (req, res) => {
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
  createTicket: async (req, res) => {
    const { title, description, primaryLanguage, userComputer, creator } =
      req.body;

    const createdTicket = {
      title,
      description,
      primaryLanguage,
      userComputer,
      creator,
    };

    fakeData.DUMMY_TICKETS.push(createdTicket);

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
