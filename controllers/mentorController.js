// Import the Mentor model
const Mentor = require("../models/mentorModel");
const HttpError = require("../models/http-error");

// Controller functions for mentors
const MentorController = {
  getAllMentors: async (req, res, next) => {
    let mentors;
    try {
      mentors = await Mentor.find();
    } catch (err) {
      const error = new HttpError(
        "Fetching mentors failed, please try again later.",
        500
      );
      return next(error);
    }

    res.json({
      mentors: mentors.map((mentor) => mentor.toObject({ getters: true })),
    });
  },
  getMentorById: async (req, res, next) => {
    const mentorId = req.params.id;

    let mentor;
    try {
      mentor = await Mentor.findById(mentorId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not find mentor.",
        500
      );
      return next(error);
    }

    if (!mentor) {
      const error = new HttpError(
        "Could not find mentor for the provided id.",
        404
      );
      return next(error);
    }

    res.json({ mentor: mentor.toObject({ getters: true }) });
  },
  updateMentor: async (req, res, next) => {
    const { specialization } = req.body;
    const mentorId = req.params.id;

    let mentor;
    try {
      mentor = await Mentor.findById(mentorId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update mentor.",
        500
      );
      return next(error);
    }

    if (!mentor) {
      const error = new HttpError(
        "Could not find mentor for the provided id.",
        404
      );
      return next(error);
    }

    mentor.specialization = specialization;

    try {
      await mentor.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not update mentor.",
        500
      );
      return next(error);
    }

    res.json({ mentor: mentor.toObject({ getters: true }) });
  },
  deleteMentor: async (req, res, next) => {
    const mentorId = req.params.id;

    let mentor;
    try {
      mentor = await Mentor.findById(mentorId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete mentor.",
        500
      );
      return next(error);
    }

    if (!mentor) {
      const error = new HttpError(
        "Could not find mentor for the provided id.",
        404
      );
      return next(error);
    }

    try {
      await mentor.remove();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete mentor.",
        500
      );
      return next(error);
    }

    res.json({ message: "Deleted mentor." });
  },
};

module.exports = MentorController;
