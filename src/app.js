import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { authRouter } from './routes/auth.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/', authRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
