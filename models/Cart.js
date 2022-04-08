const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    productItems: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        deliveryCharge: {
          type: Number,
        },
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
