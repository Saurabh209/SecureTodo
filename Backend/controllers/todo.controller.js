import { todoTask } from "../models/todo.model.js"


export const posttodoSubmit = async (req, res) => {
    console.log(req.body)

    const newTask = await todoTask.create({
        title: req.body.title,
        task: req.body.task,
        isCompleted: req.body.isCompleted,
        userAssigned:req.user._id
    })
    console.log(newTask)
    res.send("Task Added")

}

export const getTodo =async (req,res)=>{
     const currentUser = req.user._id
    const allTodo = await todoTask.find({userAssigned:currentUser})

    console.log(allTodo)
    res.json(allTodo)
}