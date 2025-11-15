
const express = require("express");
const router = express.Router();
const CibilCheck = require("../models/CibilCheck");

router.post("/", async (req, res) => {
  try {
    await CibilCheck.create(req.body);
    res.json({ message: "CIBIL data submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
