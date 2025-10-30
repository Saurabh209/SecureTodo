

import { useContext, useEffect, useState } from 'react'
import './TodoData.scss'
import { backendServer } from '../../App'
import axios from 'axios'
import SpotlightCard from '../../../ReactBitsComponents/SpotlightCard/SpotlightCard'
import { Context } from '../../main'
import toast from 'react-hot-toast'
import VariableProximity from '../../../ReactBitsComponents/VariableProximity/VariableProximity'
import { useRef } from 'react'
import ShinyText from '../../../ReactBitsComponents/ShinyText'


export default function TodoData() {
    const containerRef = useRef(null);

    // states
    const [todoTask, setTodoTask] = useState(null)
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)

    const [todoLoading, setTodoLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [theme, setTheme] = useState("green");

    const [currentTask, setCurrentTask] = useState("");
    const [taskList, setTasklist] = useState([])

    const [isactive, setIsActive] = useState(false)

    // useeffect for getting todo data
    useEffect(() => {
        axios
            .get(`${backendServer}/todo/view`, { withCredentials: true })
            .then((res) => {
                setTodoTask(res.data);
            })
            .catch((err) => {
                console.error("Error fetching todos:", err);
            })
            .finally(() => {

            });
    }, []);


    // it handles todo form visibility 
    const handleTodo = () => {
        if (!isactive) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }


    const addTask = () => {
        const task = currentTask.trim()
        if (task) {
            setTasklist([...taskList, task])
            setCurrentTask("")
        }
    };



    // submit handler for todo submit
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const data = {
            title,
            theme,
            task: taskList.map(task => ({
                name: task,
                isCompleted: false
            }))
        };
        axios
            .post(`${backendServer}/todo/add`, data, { headers: { "Content-Type": "application/json" }, withCredentials: true })
            .then((res) => {
                toast.success(data.data.message)
            })
            .catch((err) => {
                console.error("Error fetching todos:", err);
            })
            .finally(() => {
                setLoading(false)
            });

    }

    const handleTodoListBg = (color) => {
        if (color === "red") return "#ffebee"
        if (color === "blue") return "#bbdefb"
        if (color === "green") return "#b9f6ca"
    }

    const handleTitleColor = (color) => {
        if (color === "red") return "#ffb3b3"
        if (color === "blue") return "#a8d8ff"
        if (color === "green") return "#a8e6a1"
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };

        // Example: 17 Feb 2025, 13:23
        return date
            .toLocaleString('en-GB', options)
            .replace(',', '')
            .replace(/(\d{2}) (\w{3}) (\d{4})/, '$1 $2 $3,');
    }
    
    return (
        <div className='todoCardContainer'>
            {!todoTask ? <>
                {/* skeleton loader should be here */}
                <div className='todo-card  todo-add'><img src="/img/Add_Todo.png" alt="" /> </div>
            </> : <>  {todoTask?.map((items, index) => (
                <div key={index} className='todo-card'
                //  style={{ backgroundColor: handleTodoListBg(items?.theme) }}

                >
                    <div
                        className='todo-title-container'
                        style={{ backgroundColor: handleTitleColor(items.theme) }} >
                        <h2 ref={containerRef}>
                            <VariableProximity
                                label={`${items?.title}`}
                                className={'variable-proximity-demo'}
                                fromFontVariationSettings="'wght' 400, 'opsz' 19"
                                toFontVariationSettings="'wght' 1400, 'opsz' 40"
                                containerRef={containerRef}
                                radius={100}
                                falloff='linear'
                            />

                        </h2>

                    </div>
                    <div className='todo-list-container'>
                        {items?.task?.map((items, index) => (
                            <div key={index} className='single-todo-container' >
                                {items?.isCompleted ? <>
                                    <span className='completedTask'>
                                        {items?.name}
                                    </span>
                                </> : <>
                                    <span >

                                        <ShinyText
                                            text={`${items?.name}`}
                                            disabled={false}
                                            speed={3}
                                            className='custom-class'
                                        />

                                    </span>
                                </>}

                                <div className='todo-delete-completed-button-container'>
                                    <img src="/img/delete_todo.png" alt="" />
                                </div>
                                {/* <p>{items?.isCompleted ? "true" : "false"}</p> */}
                            </div>

                        ))}
                    </div>
                    <div className='todo-info-container'>
                        <p>{formatDate(items?.createdAt)}</p>
                    </div>

                </div>
            ))}</>
            }
            <div className={`todo-add ${isactive ? "active" : ""}`} style={{ display: `${!isactive ? 'flex' : ''}` }}>
                {isactive ?
                    <>
                        <div onClick={handleTodo} className='exit-butotn-container'>X</div>
                        <div className='todo-add-form-container'>
                            <form onSubmit={handleSubmit} className="todo-form">
                                <input
                                    type="text"
                                    className="todo-input"
                                    placeholder="Todo title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />

                                <select
                                    className="todo-select"
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                >
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                    <option value="red">Red</option>
                                </select>

                                <div className="task-section">
                                    <h4 className="task-heading">Tasks</h4>

                                    <div className="task-input">
                                        <input
                                            type="text"
                                            name="name"
                                            className="task-name"
                                            placeholder="Task name"
                                            value={currentTask}

                                            onChange={(e) => setCurrentTask(e.target.value)}

                                        />
                                        {/* <label className="task-check">
                                                <input
                                                    type="checkbox"
                                                    name="isCompleted"
                                                    checked={task.isCompleted}
                                                    onChange={(e) => handleTaskChange(index, e)}
                                                />
                                                Completed
                                            </label> */}
                                    </div>


                                    <button type="button" className="add-task-btn" onClick={addTask}>
                                        + Add Task
                                    </button>
                                </div>

                                <button type="submit" className="save-todo-btn">
                                    {todoLoading ? "Saving" : "Save Todo"}
                                </button>
                            </form>

                        </div>








                        {/* <form className="todo-add-form" >
                         
                            <div className="login-field">
                                <span className="span">
                                    <svg
                                        xmlSpace="preserve"
                                        viewBox="0 0 512 512"
                                        height="20"
                                        width="50"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="#595959"
                                            d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"
                                        />
                                    </svg>
                                </span>
                                <input
                                    required
                                    type="text"
                                    className="input"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label className="label">Username</label>
                            </div>

                  
                            <div className="login-field">
                                <span className="span">
                                    <svg
                                        xmlSpace="preserve"
                                        viewBox="0 0 512 512"
                                        height="20"
                                        width="50"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="#595959"
                                            d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 57.406 64 128v64H48c-26.453 0-48 21.523-48 48v224c0 26.477 21.547 48 48 48h288c26.453 0 48-21.523 48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 38.27-85.332 85.332-85.332s85.332 38.27 85.332 85.332v64H106.668zm0 0"
                                        />
                                    </svg>
                                </span>
                                <input
                                    required
                                    type="password"
                                    className="input"
                                    onChange={(e) => setPassWord(e.target.value)}
                                />
                                <label className="label">Password</label>
                            </div>

                            <div className="forgot-pass">
                                <a href="#">Forgot Password?</a>
                            </div>

                            <button type="submit" className="login-button">
                                Sign in
                            </button>

                            <div className="sign-up">
                                Not a member?Signup now
                            </div>
                        </form> */}
                    </> : <img onClick={handleTodo} src="/img/Add_Todo.png" alt="" />}




            </div>
        </div >
    )
}

