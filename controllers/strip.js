const express = require("express");
const Razorpay = require("razorpay");
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_RPTQ05k20cV4Z4",
  key_secret: "ss4bgnyOFiQv1Wlf84iPyxuG",
});

exports.strip = (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  razorpayInstance.orders.create(
    { amount, currency, receipt, notes },
    (err, order) => {
      if (!err) res.json(order);
      else res.send(err);
    }
  );
};
/*

//var Publishable_Key = 'pk_test_51KdV0ESHWdVpZknsNqNiKkWBDQU01JRKrPqWCh3zcuAbFZNublep0u8q7XJxS8CXxr1g80ZNJrqqqkUcOFWZBj0i000incBhXT'
  var Secret_Key = 'sk_test_51KdV0ESHWdVpZknsGGg0Lj7Jm0rFvXoFVQ2rRZ238TjpuQuFiAV8Mm732KdOY036W2HCWLIp660Q75vXXn8Umjtz00U9Yx6Ekw'
  const stripe = require('stripe')(Secret_Key)
    
  
exports.strip  = function(req, res){
  
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: 'shivani',
      address: {
          line1: 'indore',
          postal_code: '452001',
          city: 'Indore',
          state: 'Madhya Pradesh',
          country: 'India',
      }
  })
  .then((customer) => {

      return stripe.charges.create({
          amount: 2500,     // Charing Rs 25
          description: 'Web Development Product',
          currency: 'INR',
          customer: customer.id
      });
  })
  .then((charge) => {
      res.send("Success")  // If no error occurs
  })
  .catch((err) => {
      res.send(err)       // If some error occurs
  });
}
*/
