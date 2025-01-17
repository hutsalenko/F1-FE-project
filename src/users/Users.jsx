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

    return (
        <div className="users-wrapper">
            <div className="user-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '10px' }}>
                        Submit
                    </button>
                </form>
            </div>
            <div className="user-list">USERS LIST</div>
            <div>
                {usersList?.map((user) => (
                    <div>
                        <div>{user.email}</div>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
