import { FiSettings, FiBriefcase, FiTrash2, FiStar, FiGrid } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import logoPath from '../assets/images/logo_white.png';
import avatarPath from '../assets/images/avatar_nam.jpg';

const menuItems = [
    { path: "/", icon: FiGrid },
    { path: "/todo", icon: FiStar },
    { path: "/trash", icon: FiBriefcase },
    { path: "/note", icon: FiTrash2 },
    { path: "/favorites", icon: FiSettings },
];

const NavBar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar__head">
                <NavLink to="/" className='logo__container'>
                    <img src={logoPath} className="logo" alt="Logo" />
                </NavLink>
            </div>

            <div className="sidebar__body">
                <ul className="main__menu">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink to={item.path}>
                                <item.icon />
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <ul className="profile__container">
                    <img className="avatar" src={avatarPath} onClick={handleLogout} />
                </ul>
            </div>
        </div>
    )
}

export default NavBar;
