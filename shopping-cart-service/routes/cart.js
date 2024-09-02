const express = require("express")
const Cart = require("../models/cart")
const axios = require("axios")

const router = express.Router()

const PRODUCT_SERVICE_URI =
  process.env.PRODUCT_SERVICE_URI || "http://localhost:5001"

// Add Item to Cart
router.post("/:userId/add", async (req, res) => {
  const { userId } = req.params
  const { productId, quantity } = req.body

  try {
    const productResponse = await axios.get(
      `${PRODUCT_SERVICE_URI}/api/products/${productId}`
    )
    if (!productResponse.data) {
      return res.status(404).json({ msg: "Product not found" })
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] })
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      )
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
      } else {
        cart.items.push({ productId, quantity })
      }
    }

    await cart.save()
    res.status(201).json(cart)
  } catch (err) {
    res.status(500).send("Server error")
  }
})

// Get User Cart
router.get("/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ msg: "Cart not found" })
    res.json(cart)
  } catch (err) {
    res.status(500).send("Server error")
  }
})

// Remove Item from Cart
router.delete("/:userId/remove/:productId", async (req, res) => {
  const { userId, productId } = req.params
  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ msg: "Cart not found" })

    cart.items = cart.items.filter((item) => item.productId !== productId)

    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).send("Server error")
  }
})

// Update Item Quantity
router.put("/:userId/update/:productId", async (req, res) => {
  const { userId, productId } = req.params
  const { quantity } = req.body

  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ msg: "Cart not found" })

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    )
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity
    } else {
      return res.status(404).json({ msg: "Product not found in cart" })
    }

    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).send("Server error")
  }
})

module.exports = router
