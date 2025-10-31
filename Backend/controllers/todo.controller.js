import { todoTask } from "../models/todo.model.js"
import mongoose from "mongoose";

export const postTodo = async (req, res) => {
    try {
        const { title, task, theme } = req.body;

        if (!title || !task?.length) {
            return res.status(400).json({
                success: false,
                message: "Title and at least one task are required.",
            });
        }

        const newTask = await todoTask.create({
            title,
            task,
            theme: theme || "green",
            userAssigned: req.user._id,
        });
        res.status(201).json({
            success: true,
            message: "Task added successfully.",
            newTask,
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const getTodo = async (req, res) => {
    const currentUser = req.user._id
    const allTodo = await todoTask.find({ userAssigned: currentUser })

    console.log(allTodo)
    res.json(allTodo)
}


export const postDeleteTask = async (req, res) => {
    try {
        const { parentId, taskId } = req.body;
        console.log(parentId, taskId)

        // sanity check
        if (!parentId || !taskId) {
            return res.status(400).json({ success: false, message: "Missing IDs" });
        }

        // convert both IDs to ObjectId
        const parentObjectId = new mongoose.Types.ObjectId(parentId);
        const taskObjectId = new mongoose.Types.ObjectId(taskId);

        // delete nested task
        const updatedTodo = await todoTask.findByIdAndUpdate(
            parentObjectId,
            { $pull: { task: { _id: taskObjectId } } },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: "Todo not found" });
        }

        console.log("✅ Task deleted, updatedTodo:", updatedTodo);
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            updatedTodo,
        });

    } catch (error) {
        console.error("💥 Delete failed:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


export const postUpdateTask = async (req, res) => {
    try {
        const { parentId, taskId } = req.body;
        const data = await todoTask.findById({ _id: parentId })

        const task = data.task.id(taskId);
    
        task.isCompleted = !task.isCompleted;

        await data.save();
        res.status(200).json({ data })
    } catch (error) {
        res.status(404).send("errorrr")
    }
}
