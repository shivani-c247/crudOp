const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    productItems: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: {
      type: Number,
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
