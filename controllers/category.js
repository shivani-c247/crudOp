const Category = require("../models/Category");
const { validationResult } = require("express-validator");
const { upload } = require("../helpers/helper");

/**
 * @api {get} /category/:id Request Category
 * @apiName GetCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id Category unique ID.
 *
 * @apiSuccess {String} categoryName CategoryName of the product.
 * @apiSuccess {String}  subCategories subCategories of the product.
 * @apiSuccess {Onject} categoryImages categoryImages of the product.
 * @apiSuccess {Number} price price of the product.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "categoryName": "women Ethics",
 *       "subCategories": "sarees"
 *        "categoryImages":"productImages"
 *        "price":"price"
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

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

/**
 * @api {put} /Category/ Modify Category information
 * @apiName PutCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id  Category unique ID.
 * @apiParam {String} [categoryName] categoryName of the product.
 * @apiParam {String} [subategories]  subCategories of the product.
 *
 * @apiParam {Object} [categoryImages]  CategoryImages of the product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiUse CategoryNotFoundError
 */

exports.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const updatedCartegory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCartegory);
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
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.SearchByCondition = (req, res, next) => {
  const searchData = req.query.categoryName;
  Category.find({ categoryName: { $regex: searchData, $options: "$a" } }).then(
    (data) => {
      res.send(data);
    }
  );
};

/**
 * @apiDefine CategoryNotFoundError
 *
 * @apiError CategoryNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CategoryNotFound"
 *     }
 */

/**
 * @api {get} /Category/:id Request Category information
 * @apiName GetCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id product unique ID.
 *
 * @apiSuccess {String} CategoryName CategoryName of the Product.
 * @apiSuccess {String} subcategories  subcategories of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "categoryName": "women Ethic",
 *       "subCategories": "suites"
 *     }
 *
 * @apiUse CategoryNotFoundError
 */

exports.getAll = async (req, res) => {
  try {
    const { page, perpage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perpage, 10) || 10,
      sort: { createdAt: "desc" },
    };
    const category = await Category.paginate({}, options);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};
//delete data
exports.delete = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};
