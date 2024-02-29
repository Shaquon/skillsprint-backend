const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketController");
const { check } = require("express-validator");

router.get("/", TicketController.getTicketsByUserId);

router.get("/:tid", TicketController.getTicketById);

router.post(
  "/",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  TicketController.createTicket
);

router.put(
  "/:tid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  TicketController.updateTicket
);

router.delete("/:tid", TicketController.deleteTicket);

module.exports = router;
