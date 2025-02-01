const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, email, country, phoneNumber } = req.body

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        country,
        phoneNumber,
      },
    })

    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { updateUser }

