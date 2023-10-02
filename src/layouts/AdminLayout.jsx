import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminLayout = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);


    return (
        <div>
            <header>Admin Header</header>
            <Outlet />
            <footer>Admin Footer</footer>
        </div>
    );
};

export default AdminLayout;