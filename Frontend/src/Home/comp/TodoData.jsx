

import { useContext, useEffect, useState } from 'react'
import './TodoData.scss'
import { backendServer } from '../../App'
import axios from 'axios'
import SpotlightCard from '../../../ReactBitsComponents/SpotlightCard/SpotlightCard'
import { Context } from '../../main'
import toast from 'react-hot-toast'


export default function TodoData() {
    let defaultWidth = 260;
    let defaultHeight = 350;

    const [todoTask, setTodoTask] = useState(null)

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)
    // const [todoFormVisible, setTodoFormVisible] = useState(false)
    // const [cardHeight, setCardHeight] = useState(defaultHeight)
    // const [cardWidth, setCardWidth] = useState(defaultWidth)

    const [title, setTitle] = useState()
    const [task, setTask] = useState()
    const [isCompleted, setIsCompleted] = useState()

    const [theme, setTheme] = useState("green");
    const [tasks, setTasks] = useState([{ name: "", isCompleted: false }]);

    const [isactive, setIsActive] = useState(false)

    useEffect(() => {
        console.log("hii")
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



    const handleTodo = () => {
        if (!isactive) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }

    const handleTaskChange = (index, e) => {
        const newTasks = [...tasks];
        newTasks[index][e.target.name] =
            e.target.name === "isCompleted" ? e.target.checked : e.target.value;
        setTasks(newTasks);
    };

    const addTask = () => {
        setTasks([...tasks, { name: "", isCompleted: false }]);
    };

    const handlfteSubmit = async (e) => {
        e.preventDefault();
        const data = { title, theme, task: tasks };
        try {
            await axios.post(`${backendServer}/todo/create`, data, { withCredentials: true });
            alert("Todo created successfully!");
        } catch (err) {
            console.error(err);
        }
    };


    const handleSubmit = () => {
        setLoading(true)
        axios
            .post(`${backendServer}/todo/add`,data, { headers: { "Content-Type": "application/json" }, withCredentials: true })
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



    return (
        <div className='todoCardContainer'>
            {!todoTask ? <>
                {/* skeleton loader should be here */}
                <div className='todo-card  todo-add'><img src="/img/Add_Todo.png" alt="" /> </div>
            </> : <>  {todoTask?.map((items, index) => (
                // <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <div key={index} className='todo-card'>

                    <div className='todo-title-container' ><p>{items?.title}</p></div>
                    <div>{items.task}</div>
                    <div>{items.isCompleted ? <>completed</> : <>not completed</>}</div>


                </div>
                // </SpotlightCard>
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
                                    placeholder="Todo title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />

                                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                    <option value="red">Red</option>
                                </select>

                                <div className="task-section">
                                    <h4>Tasks</h4>
                                    {tasks.map((task, index) => (
                                        <div key={index} className="task-input">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Task name"
                                                value={task.name}
                                                onChange={(e) => handleTaskChange(index, e)}
                                                required
                                            />
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="isCompleted"
                                                    checked={task.isCompleted}
                                                    onChange={(e) => handleTaskChange(index, e)}
                                                />
                                                Completed
                                            </label>
                                        </div>
                                    ))}

                                    <button type="button" onClick={addTask}>
                                        + Add Task
                                    </button>
                                </div>

                                <button type="submit">Save Todo</button>
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

