import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import { user } from "./models/user.model.js";
import userRouter from "./routes/userRoutes.js"




dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set("view engine", "ejs")
app.use(express.json())
app.use(userRouter)








app.listen(PORT, () => {
    console.log("server is running on port number :", PORT)
})