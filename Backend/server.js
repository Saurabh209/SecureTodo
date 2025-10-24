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

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set("view engine", "ejs")
app.use(express.json())
app.use(userRouter)
app.use(todoRouter)
app.use(cors({
  origin:[],
  methods:[],
  credentials:true
}));

app.use(ErrorHandler)


// connecting Database
mongoose.connect("mongodb://localhost:27017", {
  dbName: "userInfo",
})
  .then(() => console.log("Database connected"),
    app.listen(PORT, () => {
      console.log("server is running on port number :", PORT)
    }))
  .catch((err) => console.error("DB connection error:", err));

