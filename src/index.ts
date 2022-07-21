import express from 'express'
import tasksRoutes from './routes/tasks.routes'
import usersRoutes from './routes/users.routes'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use('/tasks', tasksRoutes)
app.use('/users', usersRoutes)

app.listen(process.env.PORT)

console.log(`listening on port ${process.env.PORT}`)
