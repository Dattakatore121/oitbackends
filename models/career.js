const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    // 🌐 Multi-tenant support
    domain: {
      type: String,
      required: true,
      index: true,
    },

    // 🖼️ Job / Company Logo
    logo: {
      type: String,
      default: "",
    },

    // 🏷️ Job Title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // 📌 Job Type (Internship / Full-Time / JobAtOrange)
    type: {
      type: String,
      required: true,
      enum: ["Internship", "Job", "JobAtOrange"],
    },

    // 📝 Eligibility description
    eligibility: {
      type: String,
      required: true,
    },

    // ✅ Requirements list
    requirements: {
      type: [String],
      default: [],
    },

    // 💰 Internship Stipend
    stipend: {
      type: String,
      default: "",
    },

    // 📍 Location
    location: {
      type: String,
      required: true,
    },

    // 🧑‍💼 Experience required
    experience: {
      type: String,
      required: true,
    },

    // 🚦 Hiring status
    isHiring: {
      type: Boolean,
      default: true,
    },

    // 🪑 Position name
    position: {
      type: String,
      default: "",
    },

    // 🏢 Company name
    company: {
      type: String,
      default: "",
    },

    // 💵 Salary / Package
    salary: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);
