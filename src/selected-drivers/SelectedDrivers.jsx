import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './SelectedDrivers.scss';

export const SelectedDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
        (async () => {
            const drivers = await axios.get('http://localhost:8080/drivers').then((res) => {
                return res.data.drivers;
            });
            setDrivers(drivers);
        })();
    }, []);

    const handleDriverDeletion = async (driverId) => {
        await axios
            .delete(`http://localhost:8080/drivers/${driverId}`)
            .then((response) => {
                console.log(response.data.message);
                setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="driver-wrapper">
            {drivers?.map((driver, index) => (
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
                    <div className="item-delete" onClick={() => handleDriverDeletion(driver.driverId)}>
                        +
                    </div>
                </div>
            ))}
        </div>
    );
};
