import { Outlet } from 'react-router-dom';

const AuthLayout = ({ children }) => {
    return (
        <div className='auth__container'>
            <Outlet />
        </div>
    );
};

export default AuthLayout;