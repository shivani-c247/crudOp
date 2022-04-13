const Order = require("../models/Order");
const { validationResult } = require("express-validator");
exports.createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const {
      address,
      fullAddress,
      city,
      pinCode,
      contactNo,
      totalAmount,
      items,
      product,
      purchasedQty,
      paymentStatus,
      paymentType,
      orderStatus,
      type,
    } = req.body;
    const cartData = await Order.create({
      address,
      fullAddress,
      city,
      pinCode,
      contactNo,
      totalAmount,
      items,
      product,
      purchasedQty,
      paymentStatus,
      paymentType,
      orderStatus,
      type,
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

exports.getOne = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .select(
        "address contactNo  totalAmount paymentStatus paymentType orderStatus"
      )
      .populate("items.product");
    if (!order) {
      return res.status(400).json({ error: " Order not found...... " });
    }
    res.status(200).json({
      status: true,
      Order: order,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
