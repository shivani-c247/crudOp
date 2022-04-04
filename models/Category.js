const mongoose = require("mongoose");
var URLSlug = require("mongoose-slug-generator");
const mongoosePaginate =require("mongoose-paginate")
mongoose.plugin(URLSlug);
const categorySchema = new mongoose.Schema({
      categoryName: {
      type: String,
      required: true,
      
    },
      subCategories:{
        type:Array,
        required:true,
      },
    categoryImages: [Object],
    price:{
      type:Array,
    },
    slug: { type: String, slug: "categoryName"}
  },
  { timestamps: true }
);
categorySchema.pre("save", function(next) {
  this.slug = this.categoryName.split(" ").join("-");
  next();
});
categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", categorySchema);

