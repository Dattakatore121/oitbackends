// admin.service.js (UPDATED)
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");

const registerAdmin = async (data) => {
  const normalizedDomain = data.domain.toLowerCase().trim();

  const existingAdmin = await Admin.findOne({
    $or: [{ email: data.email }, { domain: normalizedDomain }],
  });

  if (existingAdmin) {
    return { exists: true };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = new Admin({
    mobile: data.mobile,
    email: data.email.toLowerCase(),
    firstName: data.firstName,
    lastName: data.lastName,
    companyName: data.companyName,
    address: data.address,
    domain: normalizedDomain, // 🔥 key
    password: hashedPassword,
  });

  await admin.save();
  return admin;
};

const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) return null;

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return null;

  return admin;
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
