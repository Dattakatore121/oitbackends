const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String }, // Base64 image
    college: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },

    // ✅ FIXED FIELD NAME
    packageAmount: { type: String },

    // 🔥 DOMAIN KEY
    instituteDomain: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Placement", placementSchema);
