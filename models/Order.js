const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
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
      paymentId: {
        type: String,
        default: "not present",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
