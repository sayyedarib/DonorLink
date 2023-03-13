const app = require('./app');
const { createRazorpayInstance } = require('./services/razorpay');
require('./db/connection');
const paymentSchema = require('./models/paymentSchema')


const PORT = process.env.PORT;

const instance = createRazorpayInstance();

app.get('/test', (req, res) => {
  res.send('working now');
});

app.get('/', (req, res) => {
  console.log("req of root of server ", req.body)
  res.send('Assalamalaikum');
});

app.listen(PORT || 8080, console.log(`listening to PORT ${PORT}`));
