const VideoReview = require("../models/VideoReviews.model");

/* ================= ADD VIDEO ================= */
// 🔐 ADMIN
exports.addVideo = async (req, res) => {
  try {
    const { iframe } = req.body;

    if (!req.domain) {
      return res.status(401).json({ message: "Token missing" });
    }

    if (!iframe) {
      return res.status(400).json({ message: "Iframe is required" });
    }

    const video = await VideoReview.create({
      domain: req.domain,
      iframe,
    });

    res.status(201).json({
      success: true,
      message: "Video added successfully",
      data: video,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL VIDEOS ================= */
// 🔐 ADMIN
exports.getVideos = async (req, res) => {
  try {
    if (!req.domain) {
      return res.status(401).json({ message: "Token missing" });
    }

    const videos = await VideoReview.find({
      domain: req.domain,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: videos.length,
      data: videos,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE VIDEO ================= */
// 🔐 ADMIN
exports.deleteVideo = async (req, res) => {
  try {
    if (!req.domain) {
      return res.status(401).json({ message: "Token missing" });
    }

    const deleted = await VideoReview.findOneAndDelete({
      _id: req.params.id,
      domain: req.domain,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Video not found or unauthorized" });
    }

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
