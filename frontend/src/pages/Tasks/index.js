import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import TaskBar from './../../components/TaskBar';

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let getTasks = () => {
			fetch("/api/tasks")
				.then((res) => {
					if (!res.ok)
						throw new Error(`HTTP error: ${res.status}`);
					return res.json();
				})
				.then((data) => {
					setTasks(data);
					setError(null);
				})
				.catch((err) => {
					setTasks(null);
					setError(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		getTasks()
	}, []);


	return (
		<>
			<h2>Tasks</h2>
			<TaskBar tasks={tasks} />
			<Routes>
				{tasks && tasks.map((task) => {
				return (
					<Route key={task.id} path={`task-${task.id}`} element={<h3>{task.name}</h3>} />
				)
				})}
				<Route path="/add-task" element={<h3>Add Task</h3>} />
			</Routes>
			<p>Test</p>
		</>
	);
}

export default Tasks;