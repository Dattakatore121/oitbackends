const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const adminAuth = require("../middlewares/auth.middleware");

// AUTH ROUTES
router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);

// PROFILE (only logged-in admin)
router.get("/profile", adminAuth, adminController.getAdminProfile);

module.exports = router;
