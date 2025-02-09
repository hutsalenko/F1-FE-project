import React, { useEffect, useState } from 'react';
import { requestHelper } from '../../helper/requestHelper';
import { useNavigate } from 'react-router';
import './SelectedDriverList.scss';

export const SelectedDriverList = ({ userData }) => {
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        userData.userId &&
            (async () => {
                try {
                    const drivers = await requestHelper({
                        url: '/drivers',
                    });
                    setDrivers(drivers.data.drivers);
                } catch (error) {
                    console.log(error);
                }
            })();
    }, [userData.userId]);

    const deleteDriver = async (driverId) => {
        try {
            await requestHelper({
                method: 'DELETE',
                url: `/driver/${driverId}`,
            });
            setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
        } catch (error) {
            console.log(error);
        }
    };

    const editDriver = (driver) => navigate(`edit/${driver._id}`);

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
                    {driver.imageUrl && (
                        <img
                            src={`http://localhost:8080/${driver.imageUrl}`}
                            alt="driver-photo"
                            className="item-photo"
                        />
                    )}
                    <div className="item-actions">
                        <div className="item-delete" onClick={() => deleteDriver(driver.driverId)}>
                            Delete
                        </div>
                        <div className="item-edit" onClick={() => editDriver(driver)}>
                            Edit
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
