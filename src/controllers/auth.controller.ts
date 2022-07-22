import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import pool from '../config/db'

const signUpUser = async (req: Request, _res: Response) => {
	const { username, email, password } = req.body
	const salt = await bcrypt.genSalt(10)
	const hashedPass = await bcrypt.hash(password, salt)
	const sql = `INSERT INTO users(id,username,email,password) VALUES (UUID_TO_BIN(UUID()),'${username}','${email}','${hashedPass}')`

	try {
		// eslint-disable-next-line
		const [rows, _fields] = await pool.query(sql)

		console.log(rows)
	} catch (error) {
		console.log(error)
	}
}

const signInUser = async (req: Request, res: Response) => {
	const { username, password } = req.body

	if (!username || !password) return res.status(400).send()
	const sql = `SELECT password AS hashedPass, BIN_TO_UUID(id), * AS id FROM users WHERE username LIKE '${username}'`

	try {
		// eslint-disable-next-line
		const [[rows], _fields] = await pool.query(sql)

		if (rows === undefined) {
			return res.status(404).json({ message: 'usuario no encontrado' })
		}
		const { hashedPass, id } = rows
		const areEqual = await bcrypt.compare(password, hashedPass)

		if (!areEqual) {
			return res
				.status(401)
				.json({ message: 'usuario o contraseña incorrecto' })
		}
		const token = jwt.sign(id, `${process.env.JWT_PASS}`, {
			expiresIn: '7d'
		})
		const cookiesOptions = {
			expires: new Date(
				Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
			),
			httpOnly: true
		}

		res.cookie('jwt', token, cookiesOptions)
		console.log(token)

		return res.status(200).send()
	} catch (error) {
		return console.log(error)
	}
}

const isAuthenticated = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	interface JwtPayload {
		id: string
	}
	if (req.cookies.jwt) {
		const { id } = jwt.verify(
			req.cookies.jwt,
			`${process.env.JWT_PASS}`
		) as JwtPayload

		if (!id) {
			return res.status(401).json({ message: 'token missing or invalid' })
		}

		const sql = `SELECT BIN_TO_UUID(id) AS id FROM users WHERE id = '${id}'`

		return pool.query(sql)
	} else {
		return res
			.status(401)
			.json({ message: 'No inició sesion o la sesión expiró' })
	}
}

export { signInUser, signUpUser, isAuthenticated }
