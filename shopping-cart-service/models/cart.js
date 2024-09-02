const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
})

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { cartItemSchema },
})

module.exports = mongoose.model("Cart", cartSchema)
