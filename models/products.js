const { string } = require("joi");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  sellerID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  review: [
    {
      reviewerName: String,
      rating: Number,
      reviewDate: Date,
      reviewTitle: String,
      reviewDescription: String,
    },
  ],
});

module.exports = mongoose.model("products", productSchema);
