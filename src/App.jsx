import { BrowserRouter, Route, Routes } from 'react-router';
import { DriversList } from './drivers/DriversList';
import { Header } from './header/Header';
import { Home } from './home/Home';

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="driver-list" element={<DriversList />} />
            </Routes>
        </BrowserRouter>
    );
};
