const Mentor = require("../models/Mentor");
const Student = require("../models/Student");

/**
 * @desc Students under a mentor
 * @request GET
 * @endpoint /api/v1/mentors/:id
 */
const getMentorStudents = async (req, res) => {
  const data = await Mentor.findOne({ _id: req.params.id });
  const students = [];

  for (studentId of data.students) {
    // Extract the string from ObjectId()
    const id = String(studentId)
      .match(/(?:"[^"]*"|^[^"]*$)/)[0]
      .replace(/"/g, "");

    // Find student using the extracted "id"
    const student = await Student.findOne({ _id: id });
    // Push the result to an array
    students.push(student);
  }

  res.status(201).json({
    students,
    status: "success",
  });
};

/**
 * @desc Create a mentor
 * @request POST
 * @endpoint /api/v1/mentors
 */
const createMentor = async (req, res) => {
  const mentor = await Mentor.create(req.body);
  res.status(201).json({
    msg: "Mentor added successfully",
    mentor,
    status: "success",
  });
};

/**
 * @desc Assing a mentor to a student
 * @request PATCH
 * @endpoint /api/v1/mentors/assign/:id
 */
const assignMentor = async (req, res) => {
  try {
    Mentor.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { students: req.body.students } },
      { safe: true, upsert: false, new: true },
      (err, model) => {
        if (err) throw err;
      }
    );

    res.status(201).json({
      msg: "Mentor assigned successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong while assigning a mentor!",
      status: "failure",
    });
  }
};

/**
 * @desc Unassing a student from a mentor
 * @request PATCH
 * @endpoint /api/v1/mentors/unassign/:id
 */
const unAssignMentor = async (req, res) => {
  console.log("Mentor ID: ", req.params.id);
  console.log("Students: ", req.body.students);

  try {
    Mentor.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { students: req.body.students } },
      { upsert: false },
      (err, model) => {
        if (err) throw err;
      }
    );

    res.status(201).json({
      msg: "Mentor unassigned successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong while assigning a mentor!",
      status: "failure",
    });
  }
};

module.exports = {
  getMentorStudents,
  createMentor,
  assignMentor,
  unAssignMentor,
};
