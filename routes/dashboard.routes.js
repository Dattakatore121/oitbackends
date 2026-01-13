const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const auth = require("../middlewares/auth.middleware"); // optional auth

// GET dashboard stats
router.get("/stats", auth, dashboardController.getDashboardStats);

module.exports = router;
