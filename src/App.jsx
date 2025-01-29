import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { DriversList } from './drivers/DriversList';
import { Header } from './header/Header';
import { Home } from './home/Home';
import { SelectedDrivers } from './selected-drivers/SelectedDrivers';
import { Account } from './users/Account';
import { Login } from './login/Login';
import { Signup } from './signup/Signup';
import { logoutHandler } from './helper/logoutHandler';
import { requestHelper } from './helper/requestHelper';

export const App = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState({
        isAuth: false,
        token: null,
        userId: null,
    });

    useEffect(() => {
        userData?.userId &&
            (async () => {
                try {
                    const users = await requestHelper({ url: `/user/${userData.userId}` });
                    setCurrentUser(users.data.user);
                } catch (error) {
                    console.log(error);
                }
            })();
    }, [userData?.userId]);

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

    return (
        <BrowserRouter>
            <Header
                userData={userData}
                setUserData={setUserData}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="signup" element={<Signup setUserData={setUserData} />} />
                <Route path="login" element={<Login setUserData={setUserData} />} />
                <Route
                    path="account"
                    element={
                        <Account
                            userData={userData}
                            setUserData={setUserData}
                            setCurrentUser={setCurrentUser}
                            currentUser={currentUser}
                        />
                    }
                />
                <Route path="driver-list" element={<DriversList userData={userData} />} />
                <Route path="selected-drivers" element={<SelectedDrivers userData={userData} />} />
            </Routes>
        </BrowserRouter>
    );
};
