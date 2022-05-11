const Category = require("../models/Category");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const { fileSizeFormatter } = require("../utils/helper");
/**
 * @api {get} api/category/ create a  Category
 * @apiName GetCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id Category unique ID.
 *
 * @apiSuccess {String} categoryName CategoryName of the product.
 * @apiSuccess {String}  subCategories subCategories of the product.
 * @apiSuccess {Object} categoryImages categoryImages of the product.
 * @apiSuccess {Number} price price of the product.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "categoryName": "women Ethics",
 *       "subCategories": "sarees"
 *        "categoryImages":"productImages"
 *
 *
 *     }
 *
 * @apiError CategoryNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CategoryNotFound"
 *     }
 *
 */

exports.insertCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    let imagesArray = [];
    req.files.forEach((element) => {
      const file = {
        imageName: element.originalname,
        imagePath: element.path,
        imageType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      imagesArray.push(file);
    });
    const { categoryName, subCategories, categoryImages } = req.body;
    const categoryData = await Category.create({
      categoryName,
      subCategories,
      categoryImages: imagesArray,
    });

    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: categoryData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error,
    });
  }
};

/**
 * @api {put} /api/category/:id Update a category
 * @apiName PutCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id          Category unique ID.
 * @apiParam {String} [categoryName] categoryName of the product.
 * @apiParam {String} [subCategories]  subCategories of the product.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "id":""
 *       "categoryName": "women Ethics",
 *       "subCategories": "sarees"
 *     }
 * @apiUse categoryNotFoundError
 */

exports.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const { categoryName, subCategories } = req.body;
    let payload = {
      categoryName,
      subCategories,
    };

    if (req.files.length) {
      let imagesArray = [];
      req.files.forEach((element) => {
        const file = {
          imageName: element.originalname,
          imagePath: element.path,
          imageType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2),
        };
        imagesArray.push(file);
      });

      payload.categoryImages = imagesArray;
    }

    const updatedCartegory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: payload,
      },
      { new: true }
    );
    console.log(updatedCartegory);
    if (!updatedCartegory) {
      return res.status(400).json({ error: "category not found" });
    }
    //console.log(updatedCartegory)
    res.status(200).json({
      message: "category updated succesfully",
      data: updatedCartegory,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * @api {get} /Category/:id Get User information .
 * @apiVersion 0.2.0
 * @apiName GetCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id Category unique ID.
 *
 * @apiSuccess {String} categoryName  CategoryName of the Product.
 * @apiSuccess {String} sunCategories   subCategories of the Product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "CategoryName": "women Ethics",
 *       "subCategories": " sarees"
 *     }
 *
 * @apiError CategoryNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CategoryNotFound"
 *     }
 */

exports.getOne = async (req, res) => {
  try {
    const categoryData = await Category.findById(req.params.id).select(
      "categoryName subCategories categoryImages slug "
    );
    if (!categoryData) {
      return res.status(400).json({ error: "category not found" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * @api {get} /category/: Get Category information
 * @apiVersion 0.2.0
 * @apiName Getcategory
 * @apiGroup category
 *
 * @apiSuccess {String} categoryName  categoryName of the product.
 * @apiSuccess {String} subCategories   subCategories of the product.
 * @apiSuccess {Object}  categoryImages categoryImages of the product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "categoryName": "home applience",
 *       "sunCategories": "spoon"
 *     }
 *
 *  @api {get} /category/: search category by name
 *  @apiSuccess {String} categoryName  categoryName of the product.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": categoryNameNotFound"
 *     }
 */

exports.getAll = async (req, res) => {
  try {
    const { limit = 10, page = 1, categoryName, sortBy } = req.query;
    const sort = {};
    let filter = {};

    if (categoryName) {
      filter["categoryName"] = { $regex: categoryName, $options: "i" };
    }

    if (sortBy) {
      const str = sortBy.split(":");
      sort[str[0]] = str[1] === "desc" ? -1 : 1;
    }

    const categoryList = await Category.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(limit * (page - 1));

    const totalItems = await Category.countDocuments(filter);
    if (!categoryList) {
      return res.status(404).json({
        message: "category not found",
      });
    }
    return res.status(200).json({
      categories: categoryList,
      totalItems,
      privious: page - 1,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
};

/**
    * @api {delete} /api/category/:id Delete a category
    * @apiVersion 1.0.0
    * @apiName Delete
    * @apiGroup category
    *
    * @apiParam {String} id The category id
    * @apiSuccess {String} message Category deleted successfully!
    *
    * 
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 400 not found
    *     {
    *       "error": CategoryNotFound"
    *     }

    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "message": "Category deleted successfully!"
     *    }
     *
    */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await Product.countDocuments({ category: id });
    if (productData) {
      res
        .status(400)
        .json(
          "we can't delete category because some products are already associate with it"
        );
    } else {
      const category = await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Category deleted successfully",
        data: category,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
