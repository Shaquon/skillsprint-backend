// Import the Ticket model
const Ticket = require("../models/ticketModel");
const fakeData = require("./fakeData");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

// Controller functions for tickets
const TicketController = {
  getTicketsByUserId: async (req, res) => {
    const userId = req.params.uid;

    places = Place.find({});
  },
  getTicketById: async (req, res, next) => {
    let ticketId = req.params.tid;

    try {
      ticket = await Ticket.findById(ticketId);

      if (!ticket) {
        return next(
          new HttpError("Could not find a ticket for the provided id.", 404)
        );
      }
    } catch (err) {
      const error = new HttpError(err, 500);
      return next(error);
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
      console.log("error: ", err);
      const error = new HttpError("Creating ticket failed", 500);
      return next(error);
    }

    res.status(201).json({ ticket: createdTicket });
  },
  updateTicket: async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      throw new HttpError(
        "Invalid inputs passed, please check your data.",
        422
      );
    }

    const { title, description } = req.body;
    const ticketId = req.params.tid;

    let ticket;

    try {
      ticket = await Ticket.findById(ticketId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong. Could not update tickets.",
        500
      );

      return next(error);
    }

    ticket.title = title;
    ticket.description = description;

    try {
      await ticket.save();
    } catch (err) {
      console.log("error: ", err);
      const error = new HttpError(
        "Something went wrong. Could not update place when trying to save document.",
        500
      );

      return next(error);
    }

    res.status(200).json({ ticket: ticket.toObject({ getters: true }) });
  },
  deleteTicket: async (req, res, next) => {
    const ticketId = req.params.tid;

    let ticket;
    try {
      ticket = await Ticket.findByIdAndDelete(ticketId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete ticket.",
        500
      );
      return next(error);
    }

    if (!ticket) {
      const error = new HttpError("Could not find ticket for this id.", 404);
      return next(error);
    }

    res.status(200).json({ message: "Deleted ticket." });
  },
};

module.exports = TicketController;
