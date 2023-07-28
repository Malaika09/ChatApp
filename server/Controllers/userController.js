import userModel from "../Models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const signup = async (req, res) => {
	try {
		const username = req.body.username
		const password = await bcrypt.hash(req.body.password, 10)

		const userExists = await userModel.findOne({ username: username })
		if (userExists) {
			return res.json({ msg: "The username is already taken. Try again with a new username" })
		}

		const newUser = await userModel.create({ username, password })
		res.status(200).json({ msg: "User created successfully! :)" })

	} catch (err) {
		return res.status(500).json({ msg: err.msg })
	}
}

export const login = async (req, res) => {
	try {
		const username = req.body.username
		const password = req.body.password

		const user = await userModel.findOne({ username: username })
		if (user) {
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (isPasswordValid) {
				const token = jwt.sign({ userid: user._id, username: user.username }, "<jwt secret>", { expiresIn: '1h' });
				res.status(200).json({ token })
			}
			else {
				return res.status(401).json({ msg: "Incorrect password entered" })
			}
		}
		else {
			return res.status(404).json({ msg: "User not found for the username" })
		}
	} catch (err) {
		return res.status(500).json({ msg: err.msg })
	}
}