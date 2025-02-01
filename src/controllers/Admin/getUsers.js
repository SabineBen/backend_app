const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        phoneNumber: true,
      },
    })
    res.json(users)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { getUsers }

