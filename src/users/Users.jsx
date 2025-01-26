import React, { useEffect, useState } from 'react';
import { requestHelper } from '../helper/requestHelper';
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
            try {
                const users = await requestHelper({ url: `/user` });
                setUsersList(users.data.users);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const userSelection = (user) => setUser(user);

    const userDeletion = async (user) => {
        try {
            const userResponse = await requestHelper({ method: 'DELETE', url: `/user/${user._id}`, data: formData });
            setUsersList((prev) => [...prev.filter((item) => item._id !== user._id)]);
            console.log(userResponse.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="users-wrapper">
            {/* <form className="user-form">
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
            </form> */}
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
