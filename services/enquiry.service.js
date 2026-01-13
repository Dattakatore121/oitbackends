const Enquiry = require("../models/enquiry.model");

class EnquiryService {
  async createEnquiry(data) {
    return await Enquiry.create(data);
  }

  async getEnquiriesByDomain(domain) {
    return await Enquiry.find({ domain }).sort({ createdAt: -1 });
  }

  async deleteEnquiry(id, domain) {
    return await Enquiry.findOneAndDelete({ _id: id, domain });
  }
}

module.exports = new EnquiryService();
