require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// --- START: Caching Fix (PageSpeed Optimization) ---
// 1 साल के लिए कैश अवधि सेट करें
const oneYear = 1000 * 60 * 60 * 24 * 365;

// 'public' फ़ोल्डर से सभी स्टैटिक फ़ाइलें (HTML, CSS, JS, Images) सर्व करें
// maxAge: ब्राउज़र को 1 साल तक इन फ़ाइलों को कैश करने का निर्देश देता है,
// जिससे 'Use efficient cache lifetimes' की समस्या ठीक हो जाएगी।
app.use(express.static('public', {
    maxAge: oneYear,
    immutable: true // यह बताता है कि फ़ाइलें नहीं बदलेंगी
}));
// --- END: Caching Fix (PageSpeed Optimization) ---


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

// Test Route - अब यह सिर्फ API के लिए है
app.get("/api-status", (req, res) => {
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
