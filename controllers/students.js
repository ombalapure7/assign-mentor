const Student = require("../models/Student");
const Mentor = require("../models/Mentor");

/**
 * @desc Get a studet
 * @request GET
 * @endpoint /api/v1/students/:id
 */
const getStudent = async (req, res) => {
  const student = await Student.findOne({ _id: req.params.id });
  res.status(201).json({
    student,
    status: "success",
  });
};

/**
 * @desc Create a studet
 * @request POST
 * @endpoint /api/v1/students
 */
const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json({
    msg: "Student added successfully",
    student,
    status: "success",
  });
};

/**
 * @desc Assign a student mentor
 * @request PATCH
 * @endpoint /api/v1/students/assign/:id
 */
const assignStudent = async (req, res) => {
  const mentor = await Mentor.findOne({ _id: req.body.mentor });

  // Check whether the current student is already assigned to a mentor
  for (studentId of mentor.students) {
    const id = String(studentId)
      .match(/(?:"[^"]*"|^[^"]*$)/)[0]
      .replace(/"/g, "");

    if (id === req.params.id) {
      return res.status(409).json({
        msg: "Student already assigned to this mentor",
        status: "conflict",
      });
    }
  }

  // Unassign this student from an existing mentor
  const checkMentor = await Mentor.findOne({ students: req.params.id });
  if (checkMentor != null && checkMentor._id != req.body.mentor) {
    return res.status(409).json({
      msg: `Student already assigned to ${checkMentor._id}, unassign this student first!`,
      status: "conflict",
    });
  }

  // Assign this student to the mentor
  try {
    Mentor.findOneAndUpdate(
      { _id: req.body.mentor },
      { $push: { students: req.params.id } },
      { safe: true, upsert: false, new: true },
      (err, model) => {
        if (err) throw err;
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "Error while reassigning this student",
      status: "failure",
    });
  }

  res.status(201).json({
    msg: "Student assigned to the mentor successfully",
    status: "success",
  });
};

module.exports = { getStudent, createStudent, assignStudent };
