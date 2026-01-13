const mongoose = require("mongoose");

const textReviewSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number, // ⭐ store as NUMBER
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String, // frontend date string
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TextReview", textReviewSchema);
