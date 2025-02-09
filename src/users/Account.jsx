import React, { useEffect, useState } from 'react';
import { requestHelper } from '../helper/requestHelper';
import { logoutHandler } from '../helper/logoutHandler';
import { useNavigate } from 'react-router';
import './Account.scss';

export const Account = ({ setUserData, setCurrentUser, currentUser }) => {
    const navigate = useNavigate();
    const [defaultFormData, setDefaultFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        oldPassword: '',
        newPassword: '',
    });
    const [currentFormData, setCurrentFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        oldPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        if (Object.keys(currentUser).length) {
            setDefaultFormData((prev) => ({
                ...prev,
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
            }));
            setCurrentFormData((prev) => ({
                ...prev,
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
            }));
        }
    }, [Object.keys(currentUser).length]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUserDeleting = async (e) => {
        e.preventDefault();

        try {
            await requestHelper({ method: 'DELETE', url: '/user' });
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
                url: '/user',
                data: getChangedFields(defaultFormData, currentFormData),
            });
            setDefaultFormData((prev) => ({
                ...prev,
                ...currentFormData,
            }));
            setCurrentUser((prev) => ({
                ...prev,
                ...currentFormData,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const getChangedFields = (original, updated) => {
        return Object.keys(updated).reduce((acc, key) => {
            if (original[key] !== updated[key]) {
                acc[key] = updated[key];
            }
            return acc;
        }, {});
    };

    return (
        <div className="users-wrapper">
            <form className="user-form">
                <div className="form-email">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={currentFormData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-firstName">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={currentFormData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                    />
                </div>
                <div className="form-lastName">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={currentFormData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                    />
                </div>
                <div className="form-old-password">
                    <label>New password:</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={currentFormData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter old password"
                    />
                </div>
                <div className="form-new-password">
                    <label>Old password:</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={currentFormData.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="form-submit"
                        onClick={handleUserUpdating}
                        disabled={JSON.stringify(defaultFormData) === JSON.stringify(currentFormData)}
                    >
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
