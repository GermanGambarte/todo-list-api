import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import tasksRoutes from './src/routes/tasks.routes'
import usersRoutes from './src/routes/users.routes'
import authRoutes from './src/routes/auth.routes'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/tasks', tasksRoutes)
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`)
})
