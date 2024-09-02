const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const productRoutes = require("./routes/product")

const PORT = process.env.PORT || 5001

const app = express()
dotenv.config()

app.use(express.json())

// Routes
app.use("/api/products", productRoutes)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Product Service is Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Product service is running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("🚫 Error connecting to MongoDB -> Product Service", err)
  })
