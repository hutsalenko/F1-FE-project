import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import './Header.scss';
import { requestHelper } from '../helper/requestHelper';

export const Header = ({ userData }) => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        userData.userId &&
            (async () => {
                try {
                    const users = await requestHelper({ url: `/user/${userData.userId}` });
                    setUsersList(users.data.user);
                } catch (error) {
                    console.log(error);
                }
            })();
    }, [userData.userId]);
    console.log('usersList', usersList);

    //TODO 
    //1) Add account setting route
    //2)Add form where i can edit user info
    //3)Add possibility to change password

    return (
        <>
            <div className="header-wrapper">
                <NavLink to="/login" className="login-link">
                    Login
                </NavLink>
            </div>
            <div className="header-wrapper__menu">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/driver-list">Driver List</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/selected-drivers">Selectected Drivers</NavLink>
            </div>
            <div className="header-selected-user">Selected user: {usersList.email}</div>
        </>
    );
};
