import React, { useEffect, useState } from 'react';
import { requestHelper } from '../helper/requestHelper';
import { logoutHandler } from '../helper/logoutHandler';
import { useNavigate } from 'react-router';
import './Account.scss';

export const Account = ({ userData, setUserData, setCurrentUser, currentUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        if (Object.keys(currentUser).length) {
            setFormData({
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
            });
        }
    }, [Object.keys(currentUser).length]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUserDeleting = async (e) => {
        e.preventDefault();

        try {
            await requestHelper({ method: 'DELETE', url: `/user/${userData.userId}` });
            logoutHandler(setUserData);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const handleUserUpdating = async (e) => {
        e.preventDefault();
        try {
            await requestHelper({
                method: 'PUT',
                url: `/user/${userData.userId}`,
                data: formData,
            });
            setCurrentUser((prev) => ({
                ...prev,
                ...formData,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="users-wrapper">
            <form className="user-form">
                <div className="form-email">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-firstName">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                    />
                </div>
                <div className="form-lastName">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                    />
                </div>
                <div>
                    <button type="submit" className="form-submit" onClick={handleUserUpdating}>
                        Edit user
                    </button>
                    <button type="submit" className="form-delete" onClick={handleUserDeleting}>
                        Delete user
                    </button>
                </div>
            </form>
        </div>
    );
};
