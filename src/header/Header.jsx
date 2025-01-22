import React from 'react';
import { NavLink } from 'react-router';
import './Header.scss';

export const Header = ({ user }) => {
    return (
        <>
            <div className="header-wrapper">
                <NavLink to="/signup" className="signup-link">
                    Signup
                </NavLink>
            </div>
            <div className="header-wrapper__menu">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/driver-list">Driver List</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/selected-drivers">Selectected Drivers</NavLink>
            </div>
            <div className="header-selected-user">Selected user: {user.email}</div>
        </>
    );
};
