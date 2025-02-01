import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { generateToken } from '../helpers/jwt.helper.js'

const prisma = new PrismaClient()

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: 'Name, email, and password are required' })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const token = generateToken(user.id)

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (error) {
    console.error(error) // Log the error for debugging
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user.id)

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (error) {
    console.error(error) // Log the error for debugging
    next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    console.error(error) // Log the error for debugging
    next(error)
  }
}
