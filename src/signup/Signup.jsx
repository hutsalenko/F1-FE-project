import React, { useState } from 'react';
import { requestHelper } from '../helper/requestHelper';
import './Signup.scss';

export const Signup = ({ setUserData }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [signupMessage, setSignupMessage] = useState('');

    const validate = () => {
        let isValid = true;
        const newErrors = { firstName: '', lastName: '', email: '', password: '' };

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required.';
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required.';
            isValid = false;
        }

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
                    url: '/signup',
                    data: formData,
                });

                setSignupMessage(createUserResponse.data.message);
                setUserData({
                    isAuth: false,
                });
                setFormData({ firstName: '', lastName: '', email: '', password: '' });
            } catch (error) {
                setUserData({
                    isAuth: false,
                });
                setSignupMessage(error.response.data.message);
            }
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Signup Form</h2>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>

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

                <button type="submit">Submit</button>
                {signupMessage && <div className="form-signup-msg">{signupMessage}</div>}
            </form>
        </div>
    );
};
