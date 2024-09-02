// routes/payment.js
const express = require("express")
const Payment = require("../models/payment")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const router = express.Router()

// Process a payment
router.post("/:orderId", async (req, res) => {
  const { orderId } = req.params
  const { amount, paymentMethodId } = req.body

  try {
    // Create a charge using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      payment_method: paymentMethodId,
      confirm: true,
    })

    const payment = new Payment({
      orderId,
      amount,
      status: paymentIntent.status,
      paymentMethod: "stripe",
    })

    await payment.save()

    res.status(201).json(payment)
  } catch (err) {
    res.status(500).send("Payment failed")
  }
})

// Get payment by ID
router.get("/:paymentId", async (req, res) => {
  const { paymentId } = req.params

  try {
    const payment = await Payment.findById(paymentId)
    if (!payment) return res.status(404).json({ msg: "Payment not found" })

    res.json(payment)
  } catch (err) {
    res.status(500).send("Server error")
  }
})

// Get payments for an order
router.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params

  try {
    const payments = await Payment.find({ orderId })
    res.json(payments)
  } catch (err) {
    res.status(500).send("Server error")
  }
})

module.exports = router
