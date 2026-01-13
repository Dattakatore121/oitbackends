const express = require("express");
const router = express.Router();
const Placement = require("../models/placement");

// 🔐 Domain Middleware
const domainMiddleware = (req, res, next) => {
  const domain = req.headers["x-domain"];
  if (!domain) return res.status(400).json({ message: "Domain missing" });
  req.domain = domain;
  next();
};

// ================= GET =================
router.get("/", domainMiddleware, async (req, res) => {
  try {
    const placements = await Placement.find({ instituteDomain: req.domain });
    res.json(placements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= POST =================
router.post("/", domainMiddleware, async (req, res) => {
  const { name, college, company, position, packageAmount, imageBase64 } = req.body;

  try {
    const placement = new Placement({
      name,
      college,
      company,
      position,
      package: packageAmount,
      image: imageBase64 || "", // 🔥 Base64 string directly
      instituteDomain: req.domain,
    });

    const savedPlacement = await placement.save();
    res.status(201).json(savedPlacement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ================= PUT =================
router.put("/:id", domainMiddleware, async (req, res) => {
  try {
    const placement = await Placement.findOne({
      _id: req.params.id,
      instituteDomain: req.domain,
    });

    if (!placement) return res.status(404).json({ message: "Placement not found" });

    placement.name = req.body.name || placement.name;
    placement.college = req.body.college || placement.college;
    placement.company = req.body.company || placement.company;
    placement.position = req.body.position || placement.position;
    placement.package = req.body.packageAmount || placement.package;
    if (req.body.imageBase64) placement.image = req.body.imageBase64;

    const updatedPlacement = await placement.save();
    res.json(updatedPlacement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ================= DELETE =================
router.delete("/:id", domainMiddleware, async (req, res) => {
  try {
    const placement = await Placement.findOne({
      _id: req.params.id,
      instituteDomain: req.domain,
    });

    if (!placement) return res.status(404).json({ message: "Placement not found" });

    await placement.deleteOne();
    res.json({ message: "Placement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
