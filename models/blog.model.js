const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    paragraphs: { type: [String], required: true },
    publishedAt: { type: Date, required: true },
    image: { type: String }, // ✅ Base64
    instituteDomain: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
