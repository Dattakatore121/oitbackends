const express = require("express");
const router = express.Router();
const ContactInfo = require("../models/contactInfo.model");
const auth = require("../middlewares/auth.middleware"); // optional auth

// 🔹 GET contact info for a specific domain
router.get("/", auth, async (req, res) => {
  try {
    const domain = req.query.domain;
    if (!domain) {
      return res.status(400).json({ success: false, message: "Domain is required" });
    }

    const contact = await ContactInfo.findOne({ domain });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact info not found" });
    }

    res.json({ success: true, data: contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 🔹 CREATE or UPDATE contact info for a domain
router.post("/", auth, async (req, res) => {
  try {
    const { domain, name, phones, email, openingTime, closingTime, address, fullAddress } = req.body;

    // 🔹 Validation
    if (!domain || !name || !phones || !Array.isArray(phones) || phones.length === 0 || !email) {
      return res.status(400).json({
        success: false,
        message: "Domain, Name, Phones (at least 1) and Email are required",
      });
    }

    // 🔹 Check if contact already exists
    let contact = await ContactInfo.findOne({ domain });

    if (contact) {
      // Update existing
      contact.name = name;
      contact.phones = phones;
      contact.email = email;
      contact.openingTime = openingTime || "";
      contact.closingTime = closingTime || "";
      contact.address = address || "";
      contact.fullAddress = fullAddress || "";

      await contact.save();
      return res.json({ success: true, data: contact, message: "Updated successfully" });
    }

    // Create new
    contact = new ContactInfo({
      domain,
      name,
      phones,
      email,
      openingTime: openingTime || "",
      closingTime: closingTime || "",
      address: address || "",
      fullAddress: fullAddress || "",
    });

    await contact.save();
    res.status(201).json({ success: true, data: contact, message: "Created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 🔹 DELETE contact info by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await ContactInfo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Contact info not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
