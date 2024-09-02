const twilio = require("twilio")

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    console.log("SMS sent")
  } catch (err) {
    console.error("Error sending SMS:", err)
  }
}

module.exports = sendSMS
