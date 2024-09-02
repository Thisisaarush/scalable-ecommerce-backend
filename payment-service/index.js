const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const paymentRoutes = require("./routes/payment")

const PORT = process.env.PORT || 5004

dotenv.config()
const app = express()
app.use(express.json())

// routes
app.use("/api/payments", paymentRoutes)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Payment Service is Connected to MongoDB")
    app.listen(PORT, () =>
      console.log(`Payment Service running on port ${PORT}`)
    )
  })
  .catch((err) => {
    console.error("🚫 Failed to connect to MongoDB", err)
  })
