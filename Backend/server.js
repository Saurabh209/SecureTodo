import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { ErrorHandler } from "./middleware/errorHandler.js";
import { user } from "./models/user.model.js";
import userRouter from "./routes/userRoutes.js";
import todoRouter from './routes/todoRoutes.js';
import cors from 'cors'




dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

console.log("env", process.env.Frontend_URL)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://secure-todo.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set("view engine", "ejs")
app.use(express.json())
app.use(userRouter)
app.use(todoRouter)


app.use(ErrorHandler)


// connecting Database
mongoose.connect("mongodb+srv://saurabhhh209:EldenLord@cluster0.amdmprb.mongodb.net/", {
  dbName: "userInfo",
})
  .then(() => console.log("Database connected"),
    app.listen(PORT, () => {
      console.log("server is running on port number :", PORT)
    }))
  .catch((err) => console.error("DB connection error:", err));

