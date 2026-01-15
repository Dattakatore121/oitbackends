const express = require("express");
const router = express.Router();

const {
  addVideo,
  getVideos,
  deleteVideo,
  getPublicVideos,
} = require("../controllers/VideoReviews.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// 🔐 ADMIN ROUTES (TOKEN REQUIRED)
router.post("/admin", authMiddleware, addVideo);
router.get("/admin", authMiddleware, getVideos);
router.delete("/admin/:id", authMiddleware, deleteVideo);

// 🌍 PUBLIC ROUTE (NO TOKEN)
router.get("/", getPublicVideos);

module.exports = router;
