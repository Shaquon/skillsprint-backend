const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketController");

router.get("/", TicketController.getAllTickets);

router.get("/:tid", TicketController.getTicketById);

router.post("/", TicketController.createTicket);

router.put("/:tid", TicketController.updateTicket);

router.delete("/:tid", TicketController.deleteTicket);

module.exports = router;
