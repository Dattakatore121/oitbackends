const express = require("express");
const router = express.Router();

const {
  applyNow,
  getAllApplied,
  deleteApplied,
} = require("../controllers/applied.controller");

const adminAuth = require("../middlewares/auth.middleware");

// PUBLIC – Student submits form
router.post("/", applyNow);

// ADMIN – Domain-wise fetch
router.get("/", adminAuth, getAllApplied);

// ADMIN – Domain-wise delete
router.delete("/:id", adminAuth, deleteApplied);

module.exports = router;
