import { NavLink, useRouterMatch } from 'react-router-dom';

import './TabBar.css';

const TabBar = ({tasks}) => {
	return (
		<>
			{tasks && tasks.map((task) => {
				return (
					<NavLink key={task.id} to={`/tasks/task-${task.id}`} className={({isActive}) => (isActive ? "tab-bar active" : "tab-bar")}>{task.name}</NavLink>
				)
			})}
			<NavLink to="/tasks/add-task" className={({isActive}) => (isActive ? "tab-bar active" : "tab-bar")}>Add Task</NavLink>
		</>
	);
}

export default TabBar;