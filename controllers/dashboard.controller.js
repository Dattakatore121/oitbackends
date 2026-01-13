const Batch = require("../models/batch.model");
const Enquiry = require("../models/enquiry.model");
const Placement = require("../models/placement.model");

const getDashboardStats = async (req, res) => {
  try {
    const batchesCount = await Batch.countDocuments();
    const enquiriesCount = await Enquiry.countDocuments();
    const placementsCount = await Placement.countDocuments();

    res.json({
      success: true,
      data: {
        batches: batchesCount,
        enquiries: enquiriesCount,
        placements: placementsCount,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getDashboardStats };
