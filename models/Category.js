const mongoose = require("mongoose");
var URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);
const mongoosePaginate = require("mongoose-paginate-v2");

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    subCategories: {
      type: Array,
      required: true,
    },
    categoryImages: [Object],
    slug: { type: String, slug: "categoryName", unique: true },
  },
  { timestamps: true }
);
categorySchema.pre("save", function (next) {
  this.slug = this.categoryName.split(" ").join("-");
  next();
});
categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", categorySchema);
