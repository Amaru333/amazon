const { string } = require("joi");
const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
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

  products: [
    {
      productID: String,
      // {
      //   productName: String,
      //   productPrice: Number,
      //   productDescription: String,
      //   quantity: Number,
      //   productID: String,
      //   productCategory: String,
      //   productImages: String,
      //   productReview: [
      //     {
      //       rating: Number,
      //       reviewTitle: String,
      //       reviewDescription: String,
      //     },
      //   ],
      // },
    },
  ],
});

module.exports = mongoose.model("sellers", sellerSchema);
