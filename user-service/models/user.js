const mongoose = require("mongoose")
const argon2 = require("argon2")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    this.password = await argon2.hash(this.password)
    next()
  } catch (error) {
    return next(error)
  }
})

module.exports = mongoose.model("User", userSchema)
