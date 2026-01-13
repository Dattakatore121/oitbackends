const express = require("express");
const router = express.Router();

const enquiryController = require("../controllers/enquiry.controller");
const adminAuth = require("../middlewares/auth.middleware");

// FRONTEND – create enquiry (NO AUTH, domain header required)
router.post("/", enquiryController.createEnquiry);

// ADMIN – get enquiries (AUTH REQUIRED)
router.get("/", adminAuth, enquiryController.getEnquiries);

// ADMIN – delete enquiry
router.delete("/:id", adminAuth, enquiryController.deleteEnquiry);

module.exports = router;
