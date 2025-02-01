const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const updateProfile = async (req, res, next) => {
  try {
    const { name, country, phoneNumber } = req.body

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name,
        country,
        phoneNumber,
      },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        phoneNumber: true,
      },
    })

    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { updateProfile }

