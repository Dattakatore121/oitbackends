const ContactInfo = require("../models/contactInfo.model");

// READ
const getContactInfo = async (domain) => {
  return await ContactInfo.findOne({ domain });
};

// CREATE or UPDATE (UPSERT)
const saveContactInfo = async (domain, data) => {
  if (!data.name) {
    throw new Error("Name is required");
  }

  if (!data.contact1) {
    throw new Error("Primary phone number is required");
  }

  const payload = {
    domain,
    name: data.name,
    phones: [data.contact1, data.contact2].filter(Boolean),
    email: data.email,
    openingTime: data.openingTime,
    closingTime: data.closingTime,
    address: data.address,
    fullAddress: data.fullAddress,
  };

  let contactInfo = await ContactInfo.findOne({ domain });

  if (contactInfo) {
    Object.assign(contactInfo, payload);
    return await contactInfo.save();
  }

  return await ContactInfo.create(payload);
};

// DELETE
const deleteContactInfo = async (id, domain) => {
  return await ContactInfo.findOneAndDelete({ _id: id, domain });
};

module.exports = {
  getContactInfo,
  saveContactInfo,
  deleteContactInfo,
};
