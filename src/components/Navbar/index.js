import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
	return (
		<nav>
			<NavLink exact="true" className={({isActive}) => (isActive ? "nav-item active" : "nav-item")} to="/">
				Home
			</NavLink>
			<NavLink className={({isActive}) => (isActive ? "nav-item active" : "nav-item")} to="/teams">
				Teams
			</NavLink>
			<NavLink className={({isActive}) => (isActive ? "nav-item active" : "nav-item")} to="/tasks">
				Tasks
			</NavLink>
		</nav>
	);
};

export default Navbar;
