import { NavLink, useRouterMatch } from 'react-router-dom';

import './TaskBar.css';

const TabBar = ({tasks}) => {
	return (
		<>
			<NavLink to="/tasks/add-task" className={({isActive}) => (isActive ? "tab-bar active" : "tab-bar")}>Add Task</NavLink>

			{tasks && tasks.map((task) => {
				return (
					<NavLink key={task.id} to={`/tasks/task-${task.id}`} className={({isActive}) => (isActive ? "tab-bar active" : "tab-bar")}>{task.name}</NavLink>
				)
			})}
		</>
	);
}

export default TabBar;