const dotenv = require('dotenv');
dotenv.config();
const crypto = require("crypto");
const Razorpay = require("razorpay");
//created instance of razorpay to utilize API
const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

// this method is to get the order id from the razorpay api through the instance created above
module.exports.getOrderId = async(req, res) => {
    params = req.body;
    instance.orders
      .create(params)
      .then((data) => {
        res.send({ sub: data, status: "success" });
      })
      .catch((error) => {
        res.send({ sub: error, status: "failed" });
      });
  }

//after order_id recieved and payment done by razorpay script we have to verify the payment status
module.exports.paymentVerify = async(req, res) => {
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    var response = { status: "failure" };
    if (expectedSignature === req.body.razorpay_signature)
      response = { status: "success" };
    res.send(response);
  }