const express = require("express");
const router = express.Router();

const { createStudent, getStudent, assignStudent } = require("../controllers/students");

router.route("/").post(createStudent);
router.route("/:id").get(getStudent);
router.route("/assign/:id").patch(assignStudent);

module.exports = router;
