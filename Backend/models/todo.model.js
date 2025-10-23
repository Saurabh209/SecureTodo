import mongoose from "mongoose";

const todo = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        task:{
            type:String,
            required:true,
        },
        isCompleted:{
            type:Boolean,
            default:false
        },
        userAssigned:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        }
    }
)

export const todoTask = mongoose.model("todoTask", todo)