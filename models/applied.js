const mongoose = require("mongoose");

const appliedSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: String,
    coverLetter: String,

    // 🔥 PDF stored as Base64
    resume: {
      data: String,        // base64
      contentType: String // application/pdf
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applied", appliedSchema);
