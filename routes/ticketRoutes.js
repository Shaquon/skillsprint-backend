// Import necessary modules and controllers
const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketController");

// Define routes for tickets
router.get("/", TicketController.getAllTickets);
router.get("/:tid", TicketController.getTicketById);
router.post("/", TicketController.createTicket);
router.put("/:tid", TicketController.updateTicket);
router.delete("/:tid", TicketController.deleteTicket);

// Export the router
module.exports = router;
