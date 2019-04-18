const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Product name is required"
  },
  image: [
    {
      type: String,
      require: "Product image is required"
    }
  ],
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: "Quantity is required"
  },
  price: {
    type: Number,
    required: "Price is required"
  },
  packageInfo: {
    packageHeight: {
      type: Number,
      required: "packageHeight is required"
    },
    packageLength: {
      type: Number,
      required: "packageLength is required"
    },
    packageWidth: {
      type: Number,
      required: "packageWidth is required"
    },
    packageWeight: {
      type: Number,
      required: "packageWeight is required"
    },
    packageContent: {
      type: String,
      required: "packageContent is required"
    }
  },
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: "Supplier"
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category"
  },
  shop: {
    type: mongoose.Schema.ObjectId,
    required: "shopId is required",
    ref: "Shop"
  },
  isdelete: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

module.exports = mongoose.model("Product", ProductSchema);
