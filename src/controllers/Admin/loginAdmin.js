const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")
const { generateToken } = require("../../helpers/jwt.helper.js")

const prisma = new PrismaClient()

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin || admin.role !== "admin") {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken(admin.id)

    res.json({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      token,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { loginAdmin }

