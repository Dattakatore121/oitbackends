const express = require("express");
const router = express.Router();
const Career = require("../models/career");
const adminAuth = require("../middlewares/auth.middleware");

/* ================= ADMIN ================= */

// CREATE
router.post("/", adminAuth, async (req, res) => {
  try {
    const job = new Career({
      ...req.body,
      domain: req.domain,
    });
    const saved = await job.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET ADMIN
router.get("/", adminAuth, async (req, res) => {
  const jobs = await Career.find({ domain: req.domain }).sort({
    createdAt: -1,
  });
  res.json({ success: true, data: jobs });
});

// UPDATE
router.put("/:id", adminAuth, async (req, res) => {
  const updated = await Career.findOneAndUpdate(
    { _id: req.params.id, domain: req.domain },
    req.body,
    { new: true }
  );
  res.json({ success: true, data: updated });
});

// DELETE
router.delete("/:id", adminAuth, async (req, res) => {
  await Career.findOneAndDelete({ _id: req.params.id, domain: req.domain });
  res.json({ success: true });
});

/* ================= PUBLIC ================= */

router.get("/public", async (req, res) => {
  const domain = req.headers.domain;
  if (!domain) return res.json({ success: true, data: [] });

  const jobs = await Career.find({ domain, isHiring: true }).sort({
    createdAt: -1,
  });
  res.json({ success: true, data: jobs });
});

module.exports = router;
