const Product = require("../models/product");
const { validationResult } = require("express-validator");
const { fileSizeFormatter } = require("../utils/helper")
//const Category = require("../models/Category");

/**
 * @api {get} /product/:id Request product
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Category unique ID.
 *
 * @apiSuccess {String} title title of the product.
 * @apiSuccess {String}  desc desciption of the product.
 * @apiSuccess {Object} productImages productImages of the product.
 * @apiSuccess {Number} price price of the product.
 * @apiSuccess {ObjectId} categories categories of the product.
 * @apiSuccess {String} size size of the product.
 * @apiSuccess {Number} color color of the product.
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "title": "woments collections",
 *       "desc": "description"
 *        "producyImages":"productImages"
 *        "price":"5000"
 *        "categories":"objectId"
 *     }
 *
 * @apiError ProductNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 *
 */

exports.insertProduct = async (req, res, next) => {
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
    const { title, desc, images, category, size, color, price } = req.body;
    const productData = await Product.create({
      title,
      desc,
      images: imagesArray,
      category,
      size,
      color,
      price,
    });

    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: productData,
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
 * @api {put} /api/products/:id Update a product
 * @apiName PutProduct
 * @apiGroup Products
 *
 * @apiParam {Number} id          product unique ID.
 *
 * @apiSuccess {String} [title] title of the product.
 * @apiSuccess {String}  [desc] desciption of the product.
 * @apiSuccess {Number} ]price] price of the product.
 * @apiSuccess {ObjectId} [categories] categories of the product.
 * @apiSuccess {String} [size] size of the product.
 * @apiSuccess {Number} [color] color of the product.
 *
 * @apiSuccessExample Success-Response:
 *       HTTP/1.1 200 OK
 *     {
 *       "title": "women collections",
 *       "desc": "description"
 *        "price":"5000"
 *        "categories":"objectId"
 *        "size":L
 *        "color":pink
 *     }
 
 */

exports.updateProduct = async (req, res) => {
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
   
    const { title, desc, images, category, size, color, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title,
          desc,
          images:imagesArray,
          category,
          size,
          color,
          price,
        },
      }
    );
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.AllProduct = async (req, res) => {
  try {

      const { limit = 10, page = 1, price, title , color,  lowPrice , highPrice ,category } = req.query
      const sort ={}
      let filter = {};

      //search product by conditions 
      if (title) {
        filter["title"] = { $regex: title, $options: "i" };
      }

      if (color) {
        filter["color"] = { $regex: color, $options: "i" };
    }
    if (category) {
      filter = { category: category.split(',') }
  }
     if (price) {
      filter["price"] = { $lte: parseInt(price)};
  }
      if (lowPrice, highPrice) {
        filter["price"] = { $gte: parseInt(lowPrice), $lte: parseInt(highPrice) }
      }
    if(req.query.sortBy){
      const str=req.query.sortBy.split(':')
      sort[str[0]]=str[1]==='desc'?-1:1
    }
      const productList = await Product.find(filter)
          .populate("category")
           .sort(sort)
          .limit(limit)
          .skip(limit * (page - 1));

      const totalItems = await Product.countDocuments(filter);
      if (!productList) {
          return res.status(404).json({
              message:"product not found"
          })
      }
       return res.status(200).json({
          products: productList,
          totalItems,
      });
  } catch (error) {
      return res.status(500).json({
          message: "error"
      })
  }
}

/**
 * @api {get} /Category/:id Get User information .
 * @apiVersion 0.2.0
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id product unique ID.
 * @apiSuccess {String} title  title of the Product.
 * @apiSuccess {String} desc   description of the Product.
 * @apiSuccess {Object} productImages productImages of the product.
 * @apiSuccess {Number} price price of the product.
 * @apiSuccess {ObjectId} categories categories of the product.
 * @apiSuccess {String} size size of the product.
 * @apiSuccess {Number} color color of the product.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "title": "woments collections",
 *       "desc": "description"
 *        "producyImages":"productImages"
 *        "price":"5000"
 *        "categories":"objectId"
 *        "size":"m",
 *        "color":pink
 *     }
 *
 * @apiError productNotFound The id of the product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "productNotFound"
 *     }
 */

exports.getProductById = async (req, res) => {
  try {
    const productGet = await Product.findById(req.params.id)
      .populate("category" ,"categoryName  subCategories  categoryImages")
      .select("title desc images categories size color price slug");
    if (!productGet) {
      return res.status(400).json({ error: "Product not found" });
    }
    res.status(200).json(productGet);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
    * @api {delete} /api/products/:id Delete a products
    * @apiVersion 1.0.0
    * @apiName Delete
    * @apiGroup product
    *
    * @apiParam {String} id The product id
    * @apiSuccess {String} message product deleted successfully!
    *
    * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "message": "product deleted successfully!"
     *    }
     *
     
    */
exports.deleteData = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted  sucessfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
