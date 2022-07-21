import { Request, Response, NextFunction } from 'express'
const getTasks = (_req: Request, res: Response, next: NextFunction) => {
	res.send('obteniendo tareas')
	next()
}
const getTask = (_req: Request, res: Response, next: NextFunction) => {
	res.send('obteniendo tarea')
	next()
}
const createTask = (_req: Request, res: Response, next: NextFunction) => {
	res.send('creando tareas')
	next()
}
const updateTask = (_req: Request, res: Response, next: NextFunction) => {
	res.send('actualizando tareas')
	next()
}
const deleteTask = (_req: Request, res: Response, next: NextFunction) => {
	res.send('borrando tareas')
	next()
}

export { getTask, getTasks, createTask, updateTask, deleteTask }
