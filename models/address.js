const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    address: [
      {
        fullAddress: {
          type: String,
        },
        city: {
          type: String,
        },
        pinCode: {
          type: Number,
        },
      },
    ],
    contactNo: {
      type: Number,
      min: 10,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
