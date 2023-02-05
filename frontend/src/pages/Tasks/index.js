import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import TaskBar from './../../components/TaskBar';
import TaskView from './../../components/TaskView';
import ManagerForm from './../../components/ManagerForm';

const Tasks = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		let getTasks = () => {
			fetch("/api/tasks")
				.then((res) => {
					if (!res.ok)
						throw new Error(`Failed loading Tasks:\nHTTP error: ${res.status}`);
					return res.json();
				})
				.then((data) => {
					setTasks(data);
				})
				.catch((err) => {
					setTasks(null);
					console.log(err);
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
				<Route path="/add-task" element={<ManagerForm header="Hallitse rasteja" apiPath="/api/tasks" />} />
				<Route path="/" element={<Navigate to="add-task" />} />
			</Routes>
		</>
	);
}

export default Tasks;