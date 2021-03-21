const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orders: [
    {
      orderID: String,
      orderDate: Date,
      orderPrice: String,
      orderStatus: String,
    },
  ],
  cart: [
    {
      productID: String,
    },
  ],

  address: [
    {
      houseNo: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      pincode: String,
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
