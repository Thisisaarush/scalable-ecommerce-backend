const express = require("express")
const dotenv = require("dotenv")
const notificationRoutes = require("./routes/notification")

dotenv.config()

const app = express()
app.use(express.json())

// routes
app.use("/api/notification", notificationRoutes)

const PORT = process.env.PORT || 5005

app.listen(PORT, () =>
  console.log(`Notification Service running on port ${PORT}`)
)
