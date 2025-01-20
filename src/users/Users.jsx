import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.scss';

export const Users = ({ setUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
    });

    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        (async () => {
            const drivers = await axios.get('http://localhost:8080/user').then((res) => {
                return res.data.users;
            });
            setUsersList(drivers);
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userResponse = await axios.post('http://localhost:8080/user', formData);
            setUser(formData);
            setUsersList((prev) => [...prev, formData]);
            console.log(userResponse.data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setFormData({ email: '', firstName: '', lastName: '' });
        }
    };

    const userSelection = (user) => setUser(user);

    const userDeletion = async (user) => {
        try {
            const userResponse = await axios.delete(`http://localhost:8080/user/${user._id}`, formData);
            setUsersList((prev) => [...prev.filter((item) => item._id !== user._id)]);
            console.log(userResponse.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="users-wrapper">
            <form onSubmit={handleSubmit} className="user-form">
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
                <button type="submit" className="form-submit">
                    Add user
                </button>
            </form>
            <div className="user-list">
                <div className="user-list-header">Users list:</div>
                <div>
                    {usersList?.map((user, index) => (
                        <div className="list-item" key={`${index}${user.email}`}>
                            <div>Email: {user.email}</div>
                            <div>First name: {user.firstName}</div>
                            <div>Last name: {user.lastName}</div>
                            <div className="list-item-actions">
                                <div className="select-action" onClick={() => userSelection(user)}>
                                    Select user
                                </div>
                                <div className="delete-action" onClick={() => userDeletion(user)}>
                                    Delete user
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
