const enquiryService = require("../services/enquiry.service");

/**
 * 🔓 CREATE ENQUIRY (PUBLIC – FRONTEND)
 */
exports.createEnquiry = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, email, course, message, domain } =
      req.body;

    if (!domain) {
      return res.status(400).json({ message: "Domain is required" });
    }

    const enquiry = await enquiryService.createEnquiry({
      firstName,
      lastName,
      phone,
      email,
      course,
      message,
      domain, // ✅ BODY
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 🔐 ADMIN – DOMAIN WISE ENQUIRIES
 */
exports.getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await enquiryService.getEnquiriesByDomain(req.domain);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 🔐 ADMIN – DELETE ENQUIRY
 */
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const deleted = await enquiryService.deleteEnquiry(
      req.params.id,
      req.domain
    );

    if (!deleted) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
