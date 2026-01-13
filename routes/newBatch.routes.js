const express = require("express");
const router = express.Router();
const NewBatch = require("../models/NewBatch");

// DOMAIN MIDDLEWARE
const checkDomain = (req, res, next) => {
  const domain = req.headers["x-domain"];
  if (!domain) return res.status(401).json({ message: "Domain header missing" });
  req.instituteDomain = domain.toLowerCase().trim();
  next();
};

// GET batches
router.get("/", checkDomain, async (req, res) => {
  try {
    const batches = await NewBatch.find({ instituteDomain: req.instituteDomain }).sort({ createdAt: -1 });
    res.json(batches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST batch (Base64)
router.post("/", checkDomain, async (req, res) => {
  try {
    const batch = await NewBatch.create({
      instituteDomain: req.instituteDomain,
      course: req.body.course,
      subHeading: req.body.subHeading,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      link: req.body.link,
      image: req.body.imageBase64 || "",
    });
    res.status(201).json(batch);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// PUT batch (Base64)
router.put("/:id", checkDomain, async (req, res) => {
  try {
    const updateData = {
      course: req.body.course,
      subHeading: req.body.subHeading,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      link: req.body.link,
      image: req.body.imageBase64 || undefined, // optional
    };

    const batch = await NewBatch.findOneAndUpdate(
      { _id: req.params.id, instituteDomain: req.instituteDomain },
      updateData,
      { new: true }
    );

    if (!batch) return res.status(404).json({ message: "Batch not found" });
    res.json(batch);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE batch
router.delete("/:id", checkDomain, async (req, res) => {
  try {
    const batch = await NewBatch.findOneAndDelete({ _id: req.params.id, instituteDomain: req.instituteDomain });
    if (!batch) return res.status(404).json({ message: "Batch not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
