const express = require("express");
const router = express.Router();

const {
  addVideo,
  getVideos,
  deleteVideo,
} = require("../controllers/VideoReviews.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// 🔐 ADMIN
router.post("/", authMiddleware, addVideo);
router.get("/", authMiddleware, getVideos);
router.delete("/:id", authMiddleware, deleteVideo);

module.exports = router;
