const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, country, phoneNumber } = req.body

    if (!email || !password || !name || !country || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        country,
        phoneNumber,
      },
    })

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      country: user.country,
      phoneNumber: user.phoneNumber,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { createUser }

