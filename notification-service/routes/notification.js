const express = require("express")
const sendEmail = require("../services/emailService")
const sendSMS = require("../services/smsService")
const router = express.Router()

// Send Email Notification
router.post("/email", async (req, res) => {
  const { to, subject, text } = req.body

  try {
    await sendEmail(to, subject, text)
    res.status(200).send("Email sent")
  } catch (err) {
    res.status(500).send("Failed to send email")
  }
})

// Send SMS Notification
router.post("/sms", async (req, res) => {
  const { to, message } = req.body

  try {
    await sendSMS(to, message)
    res.status(200).send("SMS sent")
  } catch (err) {
    res.status(500).send("Failed to send SMS")
  }
})

module.exports = router
