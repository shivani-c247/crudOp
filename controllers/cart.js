const Cart = require("../models/Cart");
var ObjectId = require("mongodb").ObjectId;
exports.addToCart = async (req, res, next) => {
  try {
    const { userId, productItems, quantity, price } = req.body;
    const cartData = await Cart.create({
      userId,
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
    const cart = await Cart.findById(req.params.id).populate(
      "productItems",
      "title desc images category size color "
    );

    res.status(200).json({
      status: true,
      Carts: cart,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.removeCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const objId = new ObjectId(userId);
    console.log(objId);
    const cart = await Cart.findOneAndDelete({ userId: objId });
    console.log(cart);
    res.status(200).json({
      message: "cart removed successfullt",
      Carts: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
