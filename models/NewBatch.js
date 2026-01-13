const mongoose = require("mongoose");

const newBatchSchema = new mongoose.Schema(
  {
    instituteDomain: { type: String, required: true },
    course: { type: String, required: true },
    subHeading: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // 🔥 Base64 image
    date: String,
    time: String,
    link: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewBatch", newBatchSchema);
