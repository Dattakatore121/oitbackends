const express = require("express");
const router = express.Router();
const ContactInfo = require("../models/contactInfo.model");

/* ==============================
   GET contact info by domain
============================== */
router.get("/", async (req, res) => {
  try {
    const domain = req.query.domain?.toLowerCase();

    if (!domain) {
      return res.status(400).json({
        success: false,
        message: "Domain is required",
      });
    }

    const contact = await ContactInfo.findOne({ domain });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact info not found",
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ==============================
   CREATE or UPDATE contact info
============================== */
router.post("/", async (req, res) => {
  try {
    const {
      domain,
      name,
      phones,
      email,
      openingTime,
      closingTime,
      address,
      fullAddress,
    } = req.body;

    if (
      !domain ||
      !name ||
      !email ||
      !phones ||
      !Array.isArray(phones) ||
      phones.length === 0 ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Domain, Name, Email, Address and at least one phone number are required",
      });
    }

    const normalizedDomain = domain.toLowerCase();

    let contact = await ContactInfo.findOne({ domain: normalizedDomain });

    if (contact) {
      contact.name = name;
      contact.phones = phones;
      contact.email = email;
      contact.openingTime = openingTime || "";
      contact.closingTime = closingTime || "";
      contact.address = address;
      contact.fullAddress = fullAddress || "";

      await contact.save();

      return res.json({
        success: true,
        message: "Contact info updated successfully",
        data: contact,
      });
    }

    contact = new ContactInfo({
      domain: normalizedDomain,
      name,
      phones,
      email,
      openingTime: openingTime || "",
      closingTime: closingTime || "",
      address,
      fullAddress: fullAddress || "",
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact info created successfully",
      data: contact,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ==============================
   DELETE contact info
============================== */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ContactInfo.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact info not found",
      });
    }

    res.json({
      success: true,
      message: "Contact info deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
