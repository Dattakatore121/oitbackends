const Applied = require("../models/applied");

/* ================= APPLY NOW ================= */
// 🌍 PUBLIC – Postman / Frontend (form-data + PDF)
exports.applyNow = async (req, res) => {
  try {
    const { domain, fullName, email, phone, country, coverLetter } = req.body;

    if (!domain || !fullName || !email || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    let resume = null;

    // 🔥 PDF → Base64
    if (req.file) {
      resume = {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype,
      };
    }

    await Applied.create({
      domain: domain.toLowerCase(),
      fullName,
      email,
      phone,
      country,
      coverLetter,
      resume,
    });

    res.status(201).json({
      success: true,
      message: "Applied successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL (ADMIN) ================= */
// 🔐 ADMIN – DOMAIN WISE FETCH
exports.getAllApplied = async (req, res) => {
  try {
    if (!req.domain) {
      return res.status(401).json({ message: "Token missing" });
    }

    const data = await Applied.find({ domain: req.domain }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= VIEW RESUME ================= */
// 📄 PUBLIC – PDF VIEW (NO TOKEN)
exports.viewResume = async (req, res) => {
  try {
    const app = await Applied.findById(req.params.id);

    if (!app || !app.resume || !app.resume.data) {
      return res.status(404).send("Resume not found");
    }

    const buffer = Buffer.from(app.resume.data, "base64");

    res.setHeader("Content-Type", app.resume.contentType || "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=resume.pdf"
    );

    res.send(buffer);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/* ================= DELETE ================= */
// ❌ ADMIN – DELETE (DOMAIN SAFE)
exports.deleteApplied = async (req, res) => {
  try {
    if (!req.domain) {
      return res.status(401).json({ message: "Token missing" });
    }

    const deleted = await Applied.findOneAndDelete({
      _id: req.params.id,
      domain: req.domain,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Not found or unauthorized" });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
