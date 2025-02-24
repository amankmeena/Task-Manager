import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function TaskList({ tasks, setTasks }) {
    const [editingTask, setEditingTask] = useState(null);

    const toggleComplete = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const editTask = (task) => {
        setEditingTask(task);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const updatedFormattedDueDate = new Date(editingTask.dueDate).toISOString().split('T')[0];
        
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === editingTask.id ? {...editingTask, dueDate: updatedFormattedDueDate} : task
            )
        );
        setEditingTask(null);
    };

    return (
        <div>
            {editingTask && (
                <div className="edit-form-overlay">
                    <form className="edit-form" onSubmit={handleEditSubmit}>
                        <h3>Edit Task</h3>
                        <input
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                            placeholder="Task Title"
                            required
                        />
                        <textarea
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                            placeholder="Task Description"
                        ></textarea>
                        <DatePicker
                            selected={new Date(editingTask.dueDate)}
                            onChange={(date) => setEditingTask({...editingTask, dueDate: date})}
                            placeholderText="Due Date"
                            required
                        />
                        <select
                            value={editingTask.priority}
                            onChange={(e) => setEditingTask({...editingTask, priority: e.target.value})}
                        >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                        <div className="edit-form-buttons">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <ul>
                {tasks.length === 0 ? <p>No tasks found</p> : tasks.map(task => (
                    <li key={task.id}>
                        <div className="task-header">
                            <div className="task-title">
                                <strong>{task.title}</strong>
                                <span className={`priority-tag ${task.priority}`}>{task.priority}</span>
                            </div>
                            <div className="button-group">
                                <button onClick={() => toggleComplete(task.id)}>
                                    <i className={`fas ${task.completed ? "fa-times" : "fa-check"}`}></i>
                                </button>
                                <button onClick={() => editTask(task)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => deleteTask(task.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div className="description">{task.description}</div>
                        <div className="due-date">Due: {task.dueDate}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
