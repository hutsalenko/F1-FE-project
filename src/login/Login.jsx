import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { requestHelper } from '../helper/requestHelper';
import '../signup/Signup.scss';

export const Login = ({ setUserData }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [signupMessage, setSignupMessage] = useState('');

    const validate = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
            isValid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        setSignupMessage('');
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const createUserResponse = await requestHelper({
                    method: 'POST',
                    url: '/login',
                    data: formData,
                });

                localStorage.setItem('token', createUserResponse.data.token);
                localStorage.setItem('userId', createUserResponse.data.userId);

                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

                localStorage.setItem('expiryDate', expiryDate.toISOString());

                setUserData({
                    isAuth: true,
                    token: createUserResponse.data.token,
                    userId: createUserResponse.data.userId,
                });

                setFormData({ email: '', password: '' });
                navigate('/');
            } catch (error) {
                setSignupMessage(error.message);
                setUserData({
                    isAuth: false,
                    token: null,
                    userId: null,
                });
            }
        }
    };

    const goToSignUpPage = () => navigate('/signup');

    return (
        <div className="form-container">
            <button className="sign-up-btn" onClick={() => goToSignUpPage()}>
                Sign up
            </button>

            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Login Form</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit">Login</button>
                {signupMessage && <div className="form-signup-msg">{signupMessage}</div>}
            </form>
        </div>
    );
};
