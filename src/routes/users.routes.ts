import { Router } from 'express'

import {
	getUser,
	getUsers,
	updateUser,
	deleteUser
} from '../controllers/users.controller'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
