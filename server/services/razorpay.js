const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

let instance;

const createRazorpayInstance = () => {
  if (!instance) {
    instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }
  return instance;
};

const getInstance = () => {
  if (!instance) {
    instance = createRazorpayInstance();
  }
  return instance;
};

module.exports = { createRazorpayInstance, getInstance };
