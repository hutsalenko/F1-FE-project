import { BrowserRouter, Route, Routes } from 'react-router';
import { DriversList } from './drivers/DriversList';
import { Header } from './header/Header';
import { Home } from './home/Home';
import { SelectedDrivers } from './selected-drivers/SelectedDrivers';
import { Users } from './users/Users';
import { Signup } from './signup/Signup';
import { useState } from 'react';

export const App = () => {
    const [user, setUser] = useState({});

    return (
        <BrowserRouter>
            <Header user={user} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="signup" element={<Signup />} />
                <Route path="users" element={<Users setUser={setUser} />} />
                <Route path="driver-list" element={<DriversList user={user} />} />
                <Route path="selected-drivers" element={<SelectedDrivers user={user} />} />
            </Routes>
        </BrowserRouter>
    );
};
