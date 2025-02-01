const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        phoneNumber: true,
      },
    })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { getProfile }

