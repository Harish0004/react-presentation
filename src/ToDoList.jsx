import React, { useState, useEffect } from "react";

function ToDoList() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	// Load tasks from local storage on initial render
	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
		setTasks(savedTasks);
	}, []);

	// Save tasks to local storage whenever they change
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	// Add a new task
	const addTask = () => {
		if (task.trim()) {
			const newTask = { id: Date.now(), text: task };
			setTasks([...tasks, newTask]);
			setTask("");
		}
	};

	// Delete a task
	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<div className="todo-container">
			<h1>To-Do List</h1>
			<div className="input-section">
				<input
					type="text"
					placeholder="Add a new task"
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
				<button onClick={addTask}>Add Task</button>
			</div>
			<ul>
				{tasks.map((task) => (
					<li key={task.id} className="task-item">
						{task.text}
						<button onClick={() => deleteTask(task.id)} className="delete-btn">
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ToDoList;
