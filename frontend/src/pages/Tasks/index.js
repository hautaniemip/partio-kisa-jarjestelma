import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import TaskBar from './../../components/TaskBar';
import TaskView from './../../components/TaskView';

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
					<Route key={task.id} path={`task-${task.id}`} element={<TaskView task={task} />} />
				)
				})}
				<Route path="/add-task" element={<h3>Add Task</h3>} />
				<Route path="/" element={<Navigate to="add-task" />} />
			</Routes>
		</>
	);
}

export default Tasks;