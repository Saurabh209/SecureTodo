import { todoTask } from "../models/todo.model.js"


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