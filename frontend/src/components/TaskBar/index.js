import { NavLink } from 'react-router-dom';

import './TaskBar.css';

const TabBar = ({tasks}) => {
	return (
		<>
			<NavLink to="/tasks/manage" className={({isActive}) => (isActive ? "tab-bar active" : "tab-bar")}>Hallinta</NavLink>

			{tasks && tasks.map((task) => {
				return (
					<NavLink key={task.id} to={`/tasks/task-${task.id}`} className={({isActive}) => (isActive ? "tab-bar active" : "tab-bar")}>{task.name}</NavLink>
				)
			})}
		</>
	);
}

export default TabBar;