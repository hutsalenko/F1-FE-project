import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { logoutHandler } from '../helper/logoutHandler';
import './Header.scss';

export const Header = ({ userData, setUserData, currentUser, setCurrentUser }) => {
    const navigate = useNavigate();

    const authHandler = () => {
        if (userData?.isAuth) {
            logoutHandler(setUserData);
            setCurrentUser({});
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    const editUser = () => navigate('/account');

    return (
        <>
            <div className="header-wrapper">
                {userData?.isAuth && (
                    <div className="header-user">
                        <div className="user-name">
                            <span>{currentUser.firstName}</span>&nbsp;
                            <span>{currentUser.lastName}</span>
                        </div>
                        <div className="user-email">{currentUser.email}</div>
                        <div className="user-edit" onClick={editUser}>
                            Edit
                        </div>
                    </div>
                )}
                <div className="login-link" onClick={authHandler}>
                    {userData?.isAuth ? 'Logout' : 'Login'}
                </div>
            </div>
            <div className="header-wrapper__menu">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/driver-list">Driver List</NavLink>
                <NavLink to="/selected-drivers">Selectected Drivers</NavLink>
                <NavLink to="/chats">Chats</NavLink>
            </div>
        </>
    );
};
