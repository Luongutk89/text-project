import { useState } from 'react';
import { postLogin } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email) {
                alert('Vui lòng nhập email!');
            } else if (!password) {
                alert('Vui lòng nhập password!');
            } else {
                const response = await postLogin(email, password);
                const token = response.token;
                if (!response.error) {
                    localStorage.setItem('token', token);
                    navigate('/');
                } else {
                    alert('Sai tài khoản hoặc mật khẩu')
                }
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="login__container">
            <h2 className="title">Đăng nhập</h2>
            <div className="form__group">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Enter email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form__group">
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" placeholder="Enter password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn__login" onClick={handleLogin}>Đăng nhập</button>

            <a className='btn__navigate' onClick={() => navigate('/register')}>Bạn chưa có tài khoản? Đăng ký</a>

        </div>
    )
}

export default Login;