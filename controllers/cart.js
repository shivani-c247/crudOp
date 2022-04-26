const Cart = require("../models/Cart");
const Product = require("../models/product");
exports.addToCart = async (req, res, next) => {
  try {
    const { productItems, quantity, price, total } = req.body;
    const cartData = await Cart.create({
      productItems,
      quantity,
      price,
      total: price * quantity,
    });

    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: cartData,
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

exports.getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await Product.countDocuments(id);
    if (!productData) {
      res.status(400).json("cart is Empty");
    } else {
      const cart = await Cart.findById(req.params.id).populate(
        "productItems",
        "title desc images category size color "
      );
      /*
 const quantity = req.body.quantity
  const price = req.body.price*/
      res.status(200).json({
        status: true,
        Carts: cart,
        //quantity:quantity,
        //totalPrice:price * quantity
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.RemoveCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(400).json({ error: " Cart not found...... " });
    }
    res.status(200).json({
      message: "cart deleted successfullt",
      Carts: cart,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
