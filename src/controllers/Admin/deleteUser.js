const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.user.delete({
      where: { id },
    })

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { deleteUser }

