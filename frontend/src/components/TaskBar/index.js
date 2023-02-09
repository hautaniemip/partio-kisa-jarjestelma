import { NavLink } from 'react-router-dom';

import './TaskBar.css';

const TabBar = ({tasks}) => {
	return (
		<div className="task-bar">
			<NavLink to="/tasks/manage" className={({isActive}) => (isActive ? "task-tab active" : "task-tab")}>Hallinta</NavLink>

			{tasks && tasks.map((task) => {
				return (
					<NavLink key={task.id} to={`/tasks/task-${task.id}`} className={({isActive}) => (isActive ? "task-tab active" : "task-tab")}>{task.name}</NavLink>
				)
			})}
		</div>
	);
}

export default TabBar;