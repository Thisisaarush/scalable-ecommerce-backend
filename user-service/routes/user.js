const express = require("express")
const User = require("../models/user")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const router = express.Router()

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ error: "User already exists" })
    }

    user = new User({ name, email, password })
    await user.save()

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ error: "No user with this email was found" })
    }

    const isMatch = await argon2.verify(user.password, password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
