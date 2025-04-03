// App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get("http://localhost:8080/api/tasks");
        setTasks(res.data);
    };

    const addTask = async () => {
        if (!newTask.trim()) return;
        await axios.post("http://localhost:8080/api/tasks", { title: newTask, completed: false });
        setNewTask("");
        fetchTasks();
    };

    const toggleTask = async (id, completed) => {
        await axios.put(`http://localhost:8080/api/tasks/${id}`, { title: tasks.find(t => t.id === id).title, completed: !completed });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:8080/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Task Manager</h1>
            <div className="d-flex gap-2 mb-4">
                <input
                    type="text"
                    className="form-control flex-grow-1"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTask}>Add</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td className={task.completed ? "text-decoration-line-through text-muted" : ""}>
                                {task.title}
                            </td>
                            <td>
                                <span className={`badge ${task.completed ? "bg-success" : "bg-warning"}`}>
                                    {task.completed ? "Completed" : "Pending"}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-info me-2"
                                    onClick={() => toggleTask(task.id, task.completed)}>
                                    {task.completed ? "Undo" : "Done"}
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteTask(task.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    //return (
    //    <div className="max-w-lg mx-auto p-4">
    //        <h1 className="text-xl font-bold mb-4">Task Manager</h1>
    //        <div className="flex gap-2 mb-4">
    //            <input
    //                type="text"
    //                className="border p-2 flex-grow"
    //                placeholder="Add a new task"
    //                value={newTask}
    //                onChange={(e) => setNewTask(e.target.value)}
    //            />
    //            <button className="bg-blue-500 text-white px-4 py-2" onClick={addTask}>Add</button>
    //        </div>
    //        <ul>
    //            {tasks.map(task => (
    //                <li key={task.id} className="flex justify-between p-2 border-b">
    //                    <span className={task.completed ? "line-through text-gray-500" : ""}>
    //                        {task.title}
    //                    </span>
    //                    <div>
    //                        <button className="mr-2" onClick={() => toggleTask(task.id, task.completed)}>
    //                            {task.completed ? "Undo" : "Done"}
    //                        </button>
    //                        <button className="text-red-500" onClick={() => deleteTask(task.id)}>Delete</button>
    //                    </div>
    //                </li>
    //            ))}
    //        </ul>
    //    </div>
    //);
}



//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

//function App() {
//  const [count, setCount] = useState(0)

//  return (
//    <>
//      <div>
//        <a href="https://vite.dev" target="_blank">
//          <img src={viteLogo} className="logo" alt="Vite logo" />
//        </a>
//        <a href="https://react.dev" target="_blank">
//          <img src={reactLogo} className="logo react" alt="React logo" />
//        </a>
//      </div>
//      <h1>Vite + React</h1>
//      <div className="card">
//        <button onClick={() => setCount((count) => count + 1)}>
//          count is {count}
//        </button>
//        <p>
//          Edit <code>src/App.jsx</code> and save to test HMR
//        </p>
//      </div>
//      <p className="read-the-docs">
//        Click on the Vite and React logos to learn more
//      </p>
//    </>
//  )
//}

//export default App
