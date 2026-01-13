const express = require("express");
const router = express.Router();

const {
  applyNow,
  getAllApplied,
  deleteApplied,
  viewResume,
} = require("../controllers/applied.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload");

// 🌍 PUBLIC – Apply form (Postman / Frontend)
router.post("/", upload.single("resume"), applyNow);

// 🔐 ADMIN – Protected
router.get("/", authMiddleware, getAllApplied);
router.delete("/:id", authMiddleware, deleteApplied);

// 📄 RESUME VIEW – PUBLIC (IMPORTANT FIX ✅)
router.get("/resume/:id", viewResume);

module.exports = router;
