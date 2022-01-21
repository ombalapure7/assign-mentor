const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a mentor name"],
    trim: true,
    maxlength: [50, "Name cannot be larger than 50 characters"],
  },
  expertise: {
    type: String,
    required: [true, "Must provide an area of expertise"],
    trim: true,
    maxlength: [
      50,
      "Domain expertise description should be less than 50 characters",
    ],
  },
  experience: {
    type: Number,
    required: [true, "Years of experience is mandatory"],
    trim: true,
  },
  students: [ mongoose.Types.ObjectId ],
});

module.exports = mongoose.model("Mentor", MentorSchema);
