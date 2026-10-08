require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const app = express();
app.use(express.json());
app.use(
cors({
origin: "http://localhost:5173"
})
);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.get("/", (req, res) => {
res.send("CSC220 Week 11 API is running");
});
app.use((req, res) => {
res.status(404).json({
error: "Route not found"
});
});
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
app.listen(PORT, () => {
console.log(`API running on http://localhost:${PORT}`);
});
});