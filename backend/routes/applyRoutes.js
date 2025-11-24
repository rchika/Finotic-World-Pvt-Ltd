const express = require("express");
const router = express.Router();
const ApplyForm = require("../models/ApplyForm");

// POST → http://localhost:5000/api/apply
router.post("/", async (req, res) => {
  try {
    const saved = await ApplyForm.create(req.body);
    res.json({
      message: "Application submitted successfully",
      data: saved
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
  
