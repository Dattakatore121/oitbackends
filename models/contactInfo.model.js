const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      unique: true, // प्रत्येक domain साठी एकच record
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phones: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one phone number is required",
      },
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    openingTime: {
      type: String,
      default: "",
    },
    closingTime: {
      type: String,
      default: "",
    },
    address: {
      type: String,
     
      trim: true,
       required: true,
    },
    fullAddress: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactInfo", contactInfoSchema);
