const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/TextReviews.controller");

const adminAuth = require("../middlewares/auth.middleware");

// 🌍 PUBLIC
router.post("/", addReview);

// 🔐 ADMIN
router.get("/", adminAuth, getReviews);
router.delete("/:id", adminAuth, deleteReview);

module.exports = router;
