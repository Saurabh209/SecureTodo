import { todoTask } from "../models/todo.model.js"


export const postTodo = async (req, res) => {
    try {
        console.log("starting of task creation")
        const newTask = await todoTask.create({
            title: req.body.title,
            task: req.body.task,
            isCompleted: req.body.isCompleted,
            userAssigned: req.user._id
        })
        console.log("new task: ",newTask)
        res.status(201).json({
            success: true,
            messege: "Task added successfullly",
            newTask
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            messgege:"Internal Server Error"
        })
    }

}

export const getTodo = async (req, res) => {
    const currentUser = req.user._id
    const allTodo = await todoTask.find({ userAssigned: currentUser })

    console.log(allTodo)
    res.json(allTodo)
}