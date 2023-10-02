import { useState } from 'react';
import { postRegister } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        const selectedAvatar = e.target.files[0];
        setAvatar(selectedAvatar);
    };

    const handleRegister = async () => {
        try {
            if (!username) {
                alert('Vui lòng nhập username!');
            } else if (!password) {
                alert('Vui lòng nhập password!');
            } else if (!email) {
                alert('Vui lòng nhập email!');
            } else if (!avatar) {
                alert('Vui lòng chọn avatar!');
            } else {
                const response = await postRegister(username, email, password, avatar);
                if (!response.error) {
                    alert('đăng ký thành công');
                    navigate('/login');
                } else {
                    alert('đăng ký thất bại, ' + response.message);
                }
            }
        } catch (error) {
            console.error('Registration failed', error);
        }
    };



    return (
        <div className="register__container">
            <h2 className="title">Đăng ký tài khoản</h2>
            <div className="form__group">
                <label htmlFor="username">Tên tài khoản</label>
                <input type="text" placeholder="Enter username" id="username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form__group">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Enter email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form__group">
                <label htmlFor="password">Mật khẩu</label>
                <input type="password" placeholder="Enter password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form__group">
                <label htmlFor="avatar">Ảnh đại diện</label>
                <input className='input__file' type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} />
            </div>
            <button className="btn__login" onClick={handleRegister}>Đăng ký</button>
            <a className='btn__navigate' onClick={() => navigate('/login')}>Bạn đã có tài khoản? Đăng nhập</a>
        </div>
    )
}

export default Register;
