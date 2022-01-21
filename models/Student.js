const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a mentor name"],
    trim: true,
    maxlength: [50, "Name cannot be larger than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Must provide an email"],
    trim: true,
    maxlength: [50, "Email cannot exceed more than 50 character"],
  },
  batch: {
    type: String,
    required: [true, "Batch is mandatory to add"],
    trim: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
