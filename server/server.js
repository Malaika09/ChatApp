import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose"
import router from './Routes/user.js'
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Connected to database successfully! :) ")
})
const app = express()

app.use(express.json())
app.use('/user', router)

app.listen(3000, () => {
	console.log("Server is listening on port 3000")
})

