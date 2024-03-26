// Import the Ticket model
const Ticket = require("../models/ticketModel");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const conversationStates = {
  TITLE: "TITLE",
  DESCRIPTION: "DESCRIPTION",
};

const processUserResponse = (userResponse, currentState, ticketInfo) => {
  switch (currentState) {
    case conversationStates.TITLE:
      if (userResponse.trim().length > 0) {
        ticketInfo.title = userResponse;
        currentState = conversationStates.DESCRIPTION;
        return "Great! Now, please provide a detailed description of your problem.";
      } else {
        return "Please provide a valid title for your ticket.";
      }
    case conversationStates.DESCRIPTION:
      if (userResponse.trim().length >= 10) {
        ticketInfo.description = userResponse;
        currentState = conversationStates.LANGUAGE;
        return "Thanks for the description. What programming language are you working with?";
      } else {
        return "Please provide a more detailed description of your problem.";
      }
    case conversationStates.LANGUAGE:
      const validLanguages = ["JavaScript", "Python", "Java", "C++", "Ruby"];
      if (validLanguages.includes(userResponse)) {
        ticketInfo.language = userResponse;
        // ... handle other states and transitions
        return null; // Indicates that all necessary information has been collected
      } else {
        return "Please provide a valid programming language.";
      }
    default:
      return "Sorry, something went wrong. Please start over.";
  }
};

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
  createTicketConversation: async (req, res, next) => {
    // Initialize the conversation state and ticket information
    let currentState = conversationStates.TITLE;
    const ticketInfo = {};
    console.log("inside createTicketConversation!!!!");
    // Function to process user responses and send the next question
    const sendNextQuestion = (userResponse) => {
      const nextPrompt = processUserResponse(
        userResponse,
        currentState,
        ticketInfo
      );

      if (nextPrompt) {
        // Send the next question to the user
        res.json({ prompt: nextPrompt });
      } else {
        // All information collected, create the ticket and save it to the database
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
          );
        }

        const { title, description } = ticketInfo;

        const newTicket = new Ticket({
          title,
          description,
          creator: req.userData.userId,
        });

        newTicket
          .save()
          .then((savedTicket) => {
            res.status(201).json({
              message:
                "Ticket created successfully. Transitioning to AI assistance.",
              ticket: savedTicket,
            });
          })
          .catch((err) => {
            console.log("error: ", err);
            return next(new HttpError("Creating ticket failed", 500));
          });
      }
    };

    // Handle the initial request and send the first question
    const userResponse = req.body.response;
    sendNextQuestion(userResponse);
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
