const TextReview = require("../models/TextReviews.model");

/* ================= PUBLIC – ADD ================= */
exports.addReview = async (req, res) => {
  try {
    const { domain, name, rating, description, date } = req.body;

    if (!domain || !name || !rating || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await TextReview.create({
      domain: domain.toLowerCase(),
      name,
      rating: Number(rating),
      description,
      date,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ADMIN – GET ================= */
exports.getReviews = async (req, res) => {
  try {
    const reviews = await TextReview.find({
      domain: req.domain, // 🔥 from JWT
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ADMIN – DELETE ================= */
exports.deleteReview = async (req, res) => {
  try {
    const deleted = await TextReview.findOneAndDelete({
      _id: req.params.id,
      domain: req.domain,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
