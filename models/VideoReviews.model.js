const mongoose = require("mongoose");

const videoReviewSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      index: true,
    },
    iframe: {
      type: String,
      required: true, // 🔥 iframe embed code
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VideoReview", videoReviewSchema);
