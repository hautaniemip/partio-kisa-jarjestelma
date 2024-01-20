import {NavLink} from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <NavLink exact="true" className={({isActive}) => (isActive ? "nav-item active" : "nav-item")} to="/">
                Yhteenveto
            </NavLink>
            <NavLink className={({isActive}) => (isActive ? "nav-item active" : "nav-item")} to="/teams">
                Joukkueet
            </NavLink>
            <NavLink className={({isActive}) => (isActive ? "nav-item active" : "nav-item")} to="/tasks">
                Rastit
            </NavLink>
        </nav>
    );
};

export default Navbar;
