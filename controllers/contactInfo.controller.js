const service = require("../services/contactInfo.service");

// READ
const getContactInfo = async (req, res) => {
  try {
    const info = await service.getContactInfo(req.domain);
    res.json({ success: true, data: info });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE / UPDATE (SAME API)
const saveContactInfo = async (req, res) => {
  try {
    const info = await service.saveContactInfo(req.domain, req.body);
    res.json({ success: true, data: info });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
const deleteContactInfo = async (req, res) => {
  try {
    await service.deleteContactInfo(req.params.id, req.domain);
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getContactInfo,
  saveContactInfo,
  deleteContactInfo,
};
