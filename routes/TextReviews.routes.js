const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews,
  deleteReview,
  getPublicReviews,
} = require("../controllers/TextReviews.controller");

const adminAuth = require("../middlewares/auth.middleware");

// 🌍 PUBLIC (NO TOKEN)
router.post("/", addReview);
router.get("/", getPublicReviews);

// 🔐 ADMIN (TOKEN REQUIRED)
router.get("/admin", adminAuth, getReviews);
router.delete("/admin/:id", adminAuth, deleteReview);

module.exports = router;
