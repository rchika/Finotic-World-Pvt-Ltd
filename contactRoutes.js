const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST → /api/contact
router.post("/", async (req, res) => {
  try {
    await Contact.create(req.body);
    res.json({ message: "Message received successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
