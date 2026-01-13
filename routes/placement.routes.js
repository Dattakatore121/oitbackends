const express = require("express");
const router = express.Router();
const Placement = require("../models/placement");
const sharp = require("sharp");

/* ================= DOMAIN MIDDLEWARE ================= */
const domainMiddleware = (req, res, next) => {
  const domain = req.headers["x-domain"];
  if (!domain) return res.status(400).json({ message: "Domain missing" });
  req.domain = domain;
  next();
};

/* ================= IMAGE RESIZER ================= */
async function resizeBase64(base64String) {
  if (!base64String) return "";
  const buffer = Buffer.from(
    base64String.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const resizedBuffer = await sharp(buffer)
    .resize(300, 300)
    .jpeg({ quality: 70 })
    .toBuffer();

  return `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;
}

/* ================= GET ================= */
router.get("/", domainMiddleware, async (req, res) => {
  try {
    const placements = await Placement.find({
      instituteDomain: req.domain,
    });
    res.json(placements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= POST ================= */
router.post("/", domainMiddleware, async (req, res) => {
  try {
    const {
      name,
      college,
      company,
      position,
      packageAmount,
      imageBase64,
    } = req.body;

    const image = imageBase64 ? await resizeBase64(imageBase64) : "";

    const placement = new Placement({
      name,
      college,
      company,
      position,
      packageAmount, // ✅ FIXED
      image,
      instituteDomain: req.domain,
    });

    const savedPlacement = await placement.save();
    res.status(201).json(savedPlacement);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

/* ================= PUT ================= */
router.put("/:id", domainMiddleware, async (req, res) => {
  try {
    const placement = await Placement.findOne({
      _id: req.params.id,
      instituteDomain: req.domain,
    });

    if (!placement)
      return res.status(404).json({ message: "Placement not found" });

    const {
      name,
      college,
      company,
      position,
      packageAmount,
      imageBase64,
    } = req.body;

    placement.name = name || placement.name;
    placement.college = college || placement.college;
    placement.company = company || placement.company;
    placement.position = position || placement.position;
    placement.packageAmount = packageAmount || placement.packageAmount; // ✅ FIXED

    if (imageBase64) {
      placement.image = await resizeBase64(imageBase64);
    }

    const updatedPlacement = await placement.save();
    res.json(updatedPlacement);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", domainMiddleware, async (req, res) => {
  try {
    const placement = await Placement.findOne({
      _id: req.params.id,
      instituteDomain: req.domain,
    });

    if (!placement)
      return res.status(404).json({ message: "Placement not found" });

    await placement.deleteOne();
    res.json({ message: "Placement deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
