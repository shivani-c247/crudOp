 const dotenv = require("dotenv");
dotenv.config();
const Stripe_Key= process.env.STRIPE_KEY;
const stripe = require("stripe")(Stripe_Key);

exports.createCharges = async function (req, res, next) {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
    });
    let paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: req.body.number,
        exp_month: req.body.exp_month,
        exp_year: req.body.exp_year,
        cvc: req.body.cvc,
      },
    });
    paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      customer: customer.id,
      amount: req.body.amount,
      currency: "inr",
      confirm: true,
      payment_method_types: ["card"],
    });

    res.send(paymentIntent);
  } catch (err) {
    console.log(err);
    throw new Error(error);
  }
};
