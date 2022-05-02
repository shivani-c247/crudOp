const Cart = require("../models/Cart");
var ObjectId = require("mongodb").ObjectId;
//const User=require("../models/user")
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

/*
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
*/
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne(req.params.user)
    .populate("cartItems")

    res.status(200).json({
      status: true,
      Carts: cart,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};


exports.addToCart = async (req, res) => {
  try {
    const { cartItems, user } = req.body;
    const userId = await User.findById(user);
    if (!userId) {
      return res.status(200).json({
        message: "user not exist",
      });
    }
    //if user exist
    const existCart = await Cart.findOne({ user: userId._id });

    //  user cart already available
    if (existCart) {
      try {
        //if product already exist in user cart
        const isProductExist = await Cart.findOne({
          cartItems: { $elemMatch: { productId: cartItems.productId } },
        });
        if (isProductExist) {
          let productQuantity;
          isProductExist.cartItems.map(
            (data) => (productQuantity = data.quantity)
          );
          const updateExistProduct = await Cart.findOneAndUpdate(
            { user: userId.id },
            {
              $set: {
                cartItems: {
                  ...cartItems,
                  quantity: productQuantity + cartItems.quantity,
                 
                },
              },
              
            },
            { new: true }
          );
          // console.log("line 2")
          console.log("updateExistProduct");
          return res.status(200).json({
            message: " quantity of product updated successfully",
            cart: updateExistProduct,
           
          });
        } else {
          //if product not exist in user cart
          const updateExistCart = await Cart.findOneAndUpdate(
            { user: userId.id },
            { $push: { cartItems: cartItems } },
            { new: true }
          );
          return res.status(200).json({
            message: "products added successfully",
            cart: updateExistCart,
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "something Wrong",
        });
      }
    } else {
      // if user cart not available
      const cartItem = await Cart.create({
        user: user,
        cartItems: [cartItems],
        total:total
      });
      return res.status(200).json({
        message: "new product added successfully",
        addItem: cartItem,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error",
    });
  }
};

exports.removeCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const objId = new ObjectId(productId);
    //console.log(objId);
    const cart = await Cart.findOneAndDelete({ productId: objId });
    console.log(cart);
    res.status(200).json({
      message: "cart removed successfully",
      Carts: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
