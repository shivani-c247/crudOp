const mongoose = require("mongoose");
var URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    images: [Object],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    size: { type: String, enum: ["m", "s", "XL", "L", "XXL"] },
    color: {
      type: String,
      enum: ["pink", "red", "yellow", "blue", "green", "black"],
      required: true,
    },
    price: { type: Number, min: 0 },
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamps: true }
);

ProductSchema.pre("save", function (next) {
  this.slug = this.title.split(" ").join("-");
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
