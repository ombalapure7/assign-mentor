const express = require("express");
const router = express.Router();

const {
  createMentor,
  assignMentor,
  unAssignMentor,
  getMentorStudents
} = require("../controllers/mentors");

router.route("/").post(createMentor);
router.route("/:id").get(getMentorStudents);
router.route("/assign/:id").patch(assignMentor);
router.route("/unassign/:id").patch(unAssignMentor);

module.exports = router;
