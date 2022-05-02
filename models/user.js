const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
     address: [
      {
        fullAddress: {
          type: String,
        },
        state:{
          type:String,
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
  
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);