import React, { useState } from 'react';
import { useEffect } from 'react';
import { requestHelper } from '../helper/requestHelper';
import './SelectedDrivers.scss';

export const SelectedDrivers = ({ userData }) => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        userData.userId &&
            (async () => {
                try {
                    const drivers = await requestHelper({
                        url: `/drivers/${userData.userId}`,
                    });
                    setDrivers(drivers.data.drivers);
                } catch (error) {
                    console.log(error);
                }
            })();
    }, [userData.userId]);

    const handleDriverDeletion = async (driverId) => {
        try {
            await requestHelper({
                method: 'DELETE',
                url: `/drivers/${driverId}`,
            });
            setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
        } catch (error) {
            console.log(error);
        }
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
