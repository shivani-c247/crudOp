const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    productItems: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: {
      type: Number,
      //default: 1,
    },
    price: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
