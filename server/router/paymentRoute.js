const express = require('express');
const { checkout, paymentverification } = require('../controller/paymentController');
const { getInstance } = require('../services/razorpay');

const router = express.Router();

router.post('/checkout', async (req, res) => {
  const instance = getInstance();
  const result = await checkout(instance);
  res.status(200).json(result);
});

router.post('/paymentverification', paymentverification)
module.exports = router;
