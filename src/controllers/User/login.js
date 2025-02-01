const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")
const { generateToken } = require("../../helpers/jwt.helper.js")

const prisma = new PrismaClient()

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user.id)

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      phoneNumber: user.phoneNumber,
      token,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { login }

