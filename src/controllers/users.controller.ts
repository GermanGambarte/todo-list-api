import { Request, Response, NextFunction } from 'express'
const getUsers = (_req: Request, res: Response, next: NextFunction) => {
	res.send('obteniendo users')
	next()
}
const getUser = (_req: Request, res: Response, next: NextFunction) => {
	res.send('obteniendo user')
	next()
}

const updateUser = (_req: Request, res: Response, next: NextFunction) => {
	res.send('actualizando user')
	next()
}
const deleteUser = (_req: Request, res: Response, next: NextFunction) => {
	res.send('borrando user')
	next()
}

export { getUser, getUsers, updateUser, deleteUser }
