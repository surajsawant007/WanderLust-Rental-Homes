// require('dotenv').config();
// const Razorpay = require('razorpay');

// // Check if environment variables are loaded correctly
// // console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
// // console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

// // Initialize Razorpay with key_id and key_secret
// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Create a payment order
// const createOrder = async (req, res) => {
//   const options = {
//     amount: req.body.amount * 100, // amount in the smallest currency unit (e.g., paise for INR)
//     currency: "INR",
//     receipt: "order_rcptid_11"
//   };

//   try {
//     const order = await razorpayInstance.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// module.exports = { createOrder };
