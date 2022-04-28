const Address = require("../models/address");

exports.address = async (req, res, next) => {
  try {
    const { address, fullAddress, city, pinCode, contactNo } = req.body;
    const categoryData = await Address.create({
      address,
      fullAddress,
      city,
      pinCode,
      contactNo,
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
