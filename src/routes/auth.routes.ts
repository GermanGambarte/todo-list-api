import { Router } from 'express'

import { signInUser, signUpUser } from '../controllers/auth.controller'

const router = Router()

router.post('/register', signUpUser)
router.post('/login', signInUser)

export default router
