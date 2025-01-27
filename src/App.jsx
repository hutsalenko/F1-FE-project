import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { DriversList } from './drivers/DriversList';
import { Header } from './header/Header';
import { Home } from './home/Home';
import { SelectedDrivers } from './selected-drivers/SelectedDrivers';
import { Users } from './users/Users';
import { Login } from './login/Login';
import { Signup } from './signup/Signup';
import { logoutHandler } from './helper/logoutHandler';

export const App = () => {
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({
        isAuth: false,
        token: null,
        userId: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');

        if (!token || !expiryDate) {
            return;
        }

        if (new Date(expiryDate) < new Date()) {
            logoutHandler(setUserData);
            return;
        }

        const userId = localStorage.getItem('userId');
        const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
        setUserData({ isAuth: true, token: token, userId: userId });
        setAutoLogout(remainingMilliseconds);
    }, []);

    const setAutoLogout = (milliseconds) => {
        setTimeout(() => {
            logoutHandler(setUserData);
        }, milliseconds);
    };

    console.log('user', user);
    console.log('userData', userData);

    return (
        <BrowserRouter>
            <Header user={user} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="signup" element={<Signup setUserData={setUserData} />} />
                <Route path="login" element={<Login setUserData={setUserData} />} />
                <Route path="users" element={<Users setUser={setUser} />} />
                <Route path="driver-list" element={<DriversList userData={userData} />} />
                <Route path="selected-drivers" element={<SelectedDrivers userData={userData} />} />
            </Routes>
        </BrowserRouter>
    );
};
