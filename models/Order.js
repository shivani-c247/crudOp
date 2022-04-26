const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
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
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    cartDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
      default: "pending",
    },
    paymentType: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },

    orderStatus: {
      type: {
        type: String,
        enum: ["ordered", "packed", "shipped", "delivered"],
        default: "ordered",
      },
      date: {
        type: Date,
        default: Date.now,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
