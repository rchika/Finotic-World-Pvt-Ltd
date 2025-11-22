
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Import Routes
const applyRoutes = require("./routes/applyRoutes");
const cibilRoutes = require("./routes/cibilRoutes"); 
const contactRoutes = require("./routes/contactRoutes");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✔ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Application Routes
app.use("/api/apply", applyRoutes);
app.use("/api/cibil", cibilRoutes);
app.use("/api/contact", contactRoutes);

// Start Server
app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on port", process.env.PORT || 5000);
});
