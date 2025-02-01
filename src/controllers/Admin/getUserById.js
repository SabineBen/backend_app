const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id },
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

module.exports = { getUserById }

