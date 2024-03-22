const express = require("express");
const router = express.Router();
const MentorController = require("../controllers/mentorController");
const checkAuth = require("../middleware/auth");

router.get("/mentors", MentorController.getAllMentors);

router.use(checkAuth);

router.get("/mentors/:id", MentorController.getMentorById);
router.post("/mentors", MentorController.createMentor);
router.put("/mentors/:id", MentorController.updateMentor);
router.delete("/mentors/:id", MentorController.deleteMentor);

module.exports = router;
