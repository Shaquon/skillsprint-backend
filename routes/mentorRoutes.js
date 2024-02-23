// Import necessary modules and controllers
const express = require('express');
const router = express.Router();
const MentorController = require('../controllers/mentorController');

// Define routes for mentors
router.get('/mentors', MentorController.getAllMentors);
router.get('/mentors/:id', MentorController.getMentorById);
router.post('/mentors', MentorController.createMentor);
router.put('/mentors/:id', MentorController.updateMentor);
router.delete('/mentors/:id', MentorController.deleteMentor);

// Export the router
module.exports = router;
