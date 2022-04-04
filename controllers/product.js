const Product = require("../models/product");
const { validationResult } = require('express-validator');

/**
 * @api {get} /product/:id Request product 
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Category unique ID.
 *
 * @apiSuccess {String} title title of the product.
 * @apiSuccess {String}  desc desciption of the product.
 * @apiSuccess {Onject} productImages productImages of the product.
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

exports.insertProduct=  async (req, res, next) => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
        let imagesArray = [];
        req.files.forEach(element => {
            const file = {
                imageName: element.originalname,
                imagePath: element.path,
                imageType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            imagesArray.push(file);
        });
        const ProductData = new Product({
            title: req.body.title,
            desc:req.body.desc,
            images: imagesArray ,
            categories:req.body.categories,
            size:req.body.size,
            color:req.body.color,
            price:req.body.price,
            
        });
       
          await ProductData.save();
          res.status(201).send({
            status:true,
            message:'data saved and images Uploaded Successfully',
          data:ProductData});
    }catch(error) {
        res.status(400).send(error.message);
    }
}
    
  const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
  
  }
// update product
exports.updateProduct= async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  // get all products
  exports.AllProduct= async (req, res) => {
    try{
      const { page , perpage } = req.query;
      const options={
        page:parseInt(page,10) ||1,
        limit:parseInt(perpage,10) ||10,
      }
       const products = await Product.paginate({},options)
      res.status(200).json(  products);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
//search single data
  exports.getOneData= async (req, res) => {
    try {
      const productGet = await Product.findById(req.params.id)
      .populate("categories")
      res.status(200).json(productGet);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  //delete data
  exports.deleteData =async (req, res) => {
    try {
    const product=  await Product.findByIdAndDelete(req.params.id); 
    if(!product){
      return res.status(400).json({error:"product not found"})
    }
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  //search by condition
exports.SearchByCondition= (req,res,next)=>{
    const searchData=req.query.title;
    Product.find({title:{$regex:searchData,$options:'$a'}})
    .then(data=>{
        res.send(data);
    })
}


//countAllData
exports.countAllProducts = async (req, res) => {
  try {
    const count = await Product.find()
    .count()
    res.status(200).json({
      status :true,
      message:`total no. of data presented $count`,
      TotalProducts:count})

  } catch (err) {
    res.status(500).json(err);
  }
};

