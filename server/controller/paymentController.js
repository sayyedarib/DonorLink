const crypto = require("crypto");

const paymentSchema =require('../models/paymentSchema')

const checkout = async (instance) => {
  const options = {
    amount: 50000,
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  const order = await instance.orders.create(options);

  console.log(order);
  return { success: true, order };
};

const paymentverification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

const isAuthentic = expectedSignature===razorpay_signature;

if(isAuthentic){
const data =new paymentSchema({
  razorpay_order_id, razorpay_payment_id, razorpay_signature 
})
await data.save();
//database codes here
res.redirect(`http://localhost:3000/paymentSuccess?reference=${razorpay_payment_id}`);

}
else{
res.status(400).json({
  success:false,
})
}

  res.status(200).json({
    success: true,
  });
};

module.exports = { checkout, paymentverification };
