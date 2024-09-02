const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cartRoutes = require("./routes/cart")

const PORT = process.env.PORT || 5002

dotenv.config()
const app = express()

app.use(express.json())

// routes
app.use("/api/cart", cartRoutes)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Shopping Cart Service is Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`)
    })
  })
  .catch((error) => {
    console.error(
      "🚫 Failed to connect to MongoDB -> Shopping Cart Service",
      error
    )
  })
