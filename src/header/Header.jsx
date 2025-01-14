import React from 'react';
import { NavLink } from 'react-router';
import './Header.scss';

export const Header = () => {
    return (
        <>
            <div className="header-wrapper"></div>
            <div className="header-wrapper__menu">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/driver-list">Driver List</NavLink>
                <NavLink to="/selected-drivers">Selectected Drivers</NavLink>
            </div>
        </>
    );
};
