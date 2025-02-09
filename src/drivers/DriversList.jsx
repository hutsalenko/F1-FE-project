import React, { useState } from 'react';
import { useEffect } from 'react';
import { requestHelper } from '../helper/requestHelper';
import axios from 'axios';
import './DriversList.scss';

export const DriversList = ({ userData }) => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        (async () => {
            const drivers = await axios.get('http://ergast.com/api/f1/2024/drivers.json').then((res) => {
                return res.data.MRData.DriverTable.Drivers;
            });
            setDrivers(drivers);
        })();
    }, []);

    const handleDriverClick = async (driver) => {
        await requestHelper({
            method: 'POST',
            url: '/drivers',
            data: driver,
        });
    };

    return (
        <div className="driver-wrapper">
            {drivers.map((driver, index) => (
                <div key={index} className="driver-item">
                    <div>Driver code - {driver.code}</div>
                    <div>Date of birth - {driver.dateOfBirth}</div>
                    <div>Driver ID - {driver.driverId}</div>
                    <div>Family name - {driver.familyName}</div>
                    <div>Given name - {driver.givenName}</div>
                    <div>Nationality - {driver.nationality}</div>
                    <div>Permanent number - {driver.permanentNumber}</div>
                    <div>
                        Url - <a href={`${driver.url}`}>{driver.url}</a>
                    </div>

                    {userData.isAuth ? (
                        <div className="item-add" onClick={() => handleDriverClick(driver)}>
                            +
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ))}
        </div>
    );
};
