//const Order = require("../models/Order");
const Order = require("../models/Order");
const { validationResult } = require("express-validator");

exports.createOrder = async (req, res, next) => {
  try {
    const {
      user,
      address,
      items,
      cartDetails,
      product,
      paymentStatus,
      paymentType,
      orderStatus,
      type,
    } = req.body;
    const order = await Order.create({
      user,
      address,
      items,
      cartDetails,
      product,
      paymentStatus,
      paymentType,
      orderStatus,
      type,
    });

    return res.status(200).json({
      success: true,
      message: "Order Placed successfully.",
      data: order,
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
      .select("address  paymentStatus paymentType orderStatus")
      .populate("address")
      .populate("items.product")
      .populate("cartDetails", "price quantity total");
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

exports.updateOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const {
      user,
      address,
      items,
      cartDetails,
      product,
      paymentStatus,
      paymentType,
      orderStatus,
      type,
    } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: {
        user,
        address,
        items,
        cartDetails,
        product,
        paymentStatus,
        paymentType,
        orderStatus,
        type,
      },
    });
    res.status(200).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.allOrders = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const sort = {};
    let filter = {};

    if (req.query.sortBy) {
      const str = req.query.sortBy.split(":");
      sort[str[0]] = str[1] === "desc" ? -1 : 1;
    }
    const orderList = await Order.find(filter)
      .populate("cartDetails")
      .populate("items.product")
      .sort(sort)
      .limit(limit)
      .skip(limit * (page - 1));
    const totalItems = await Order.countDocuments(filter);
    if (!orderList) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    console.log(filter, "filter", sort, "sort");
    return res.status(200).json({
      OrderList: orderList,
      totalItems,
      privious: page - 1,
      totalPages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};
