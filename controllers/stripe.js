const dotenv = require("dotenv");
dotenv.config();
const Order = require("../models/Order");
const Stripe_Key = process.env.STRIPE_KEY;
const stripe = require("stripe")(Stripe_Key);
const { validationResult } = require("express-validator");
var nodemailer = require("nodemailer");

exports.createCharges = async (req, res) => {
  try {
    // Create the PaymentIntent
    const { email, number, exp_month, exp_year, cvc, amount, cartDetails } =
      req.body;
    const customer = await stripe.customers.create({
      email: email,
    });
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });
    const intent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      customer: customer.id,
      amount: amount,
      currency: "usd",
      confirmation_method: "manual",
      confirm: true,
      metadata: {
        cartDetails: cartDetails,
      },
    });
    const order = new Order({
      paymentType: "card",
      cartDetails: cartDetails,
    });
    order.save();
    console.log(intent);
    res.status(200).send(generateResponse(intent));
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: e.message });
  }
};

const generateResponse = (intent) => {
  if (intent.status === "succeeded") {
    return {
      success: true,
    };
  } else {
    console.log(intent.status);
    return {
      message:
        "Invalid PaymentIntent status required confirmation from customer side",
      intent,
    };
  }
};

/*

exports.createCharges = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const { email, number, exp_month, exp_year, cvc, amount } = req.body;
    const customer = await stripe.customers.create({
      email: email,
    });
    let paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });
    paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      customer: customer.id,
      amount: amount,
      currency: "usd",
      confirm: true,
      payment_method_types: ["card"],
    });

   console.log(paymentIntent)
    res.send(paymentIntent);

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      secure: true,
    });

    const mailData = {
      from: "shivanipanwar318@gmail.com",
      to: email,
      subject: "Payment Done Successfully",
      text: "Payment Done Successfully !",
      html:
        " <h1>Success</h1> " +
        "<p>We received your payments $(paymentIntent);<br/> well be in touch shortly!</p>",
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log("email sent successfully");
      console.log(info);
    });
  } catch (err) {
    console.log(err);
    throw new Error(error);
  }
};

*/
