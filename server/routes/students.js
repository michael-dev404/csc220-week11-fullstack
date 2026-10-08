const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const router = express.Router();
// GET /api/students - public
router.get("/", async (req, res) => {
try {
const students = await Student.find().sort({ createdAt: -1 });
res.json(students);
} catch (error) {
res.status(500).json({
error: "Could not load students"
});
}
});
// POST /api/students - protected
router.post("/", auth, async (req, res) => {
try {
const { name, major, score } = req.body;
const student = await Student.create({
name,
major,
score
});
res.status(201).json(student);
} catch (error) {
res.status(400).json({
error: error.message
});
}
});
// DELETE /api/students/:id - protected
router.delete("/:id", auth, async (req, res) => {
try {
const student = await Student.findByIdAndDelete(req.params.id);
if (!student) {
return res.status(404).json({
error: "Student not found"
});
}
res.status(204).end();
} catch (error) {
res.status(400).json({
error: "Invalid student id"
});
}
});
module.exports = router;