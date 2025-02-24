import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskForm({ setTasks }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueDate) return alert("Fill the required details!");

        const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];

        setTasks((prevTasks) => [
            ...prevTasks,
            {
                id: Date.now(),
                title,
                description,
                dueDate: formattedDueDate,
                priority,
                completed: false,
            },
        ]);
        setTitle("");
        setDescription("");
        setDueDate(new Date());
        setPriority("Medium");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                required
            ></textarea>
            <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}              placeholderText="Due Date"
                required
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            <button  type="submit">+ Add Task</button>
        </form>
    );
}

export default TaskForm;
