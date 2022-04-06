const mongoose = require("mongoose");
var URLSlug = require("mongoose-slug-generator");
const mongoosePaginate = require("mongoose-paginate");
mongoose.plugin(URLSlug);
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    images: [Object],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    size: { type: String, enum: ["m", "s", "XL", "L", "XXL"] },
    color: {
      type: String,
      enum: ["pink", "red", "yellow", "blue", "green"],
      required: true,
    },
    price: { type: Number },
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamps: true }
);

ProductSchema.pre("save", function (next) {
  this.slug = this.title.split(" ").join("-");
  next();
});
ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", ProductSchema);
