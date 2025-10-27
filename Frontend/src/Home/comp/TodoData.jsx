

import { useEffect, useState } from 'react'
import './TodoData.scss'
import { backendServer } from '../../App'
import axios from 'axios'

export default function TodoData() {
    const [todoTask, setTodoTask] = useState(null)

    useEffect(() => {
        axios.get(`${backendServer}/todo/view`, { withCredentials: true })
            .then(res => {
                setTodoTask(res.data)
            })
    }, [])

    console.log(todoTask)

    return (
        <div className='todoCardContainer'>
            {!todoTask ? <>
            {/* skeleton loader should be here */}
                <div className='todo-card  todo-add'><img src="/img/Add_Todo.png" alt="" /> </div>
            </> : <>  {todoTask?.map((items, index) => (
                <div key={index} className='todo-card'>{items.title}</div>
            ))}</>
            }

            <div className='todo-card  todo-add'><img src="/img/Add_Todo.png" alt="" /> </div>

        </div>
    )
}