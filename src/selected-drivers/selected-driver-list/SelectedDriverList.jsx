import React, { useEffect, useState } from 'react';
import { requestHelper } from '../../helper/requestHelper';
import { useNavigate } from 'react-router';
import Pagination from './pagination/Pagination';
import './SelectedDriverList.scss';

export const SelectedDriverList = ({ userData }) => {
    const navigate = useNavigate();
    const [drivers, setDrivers] = useState([]);
    const [paginationParams, setPaginationParams] = useState({
        currentPage: 1,
        limitPerPage: 5,
    });
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        userData.userId &&
            (async () => {
                try {
                    const drivers = await requestHelper({
                        url: `/drivers?page=${paginationParams.currentPage}&limit=${paginationParams.limitPerPage}`,
                    });
                    setDrivers(drivers.data.drivers);
                    setTotalPages(Math.ceil(drivers.data.totalItems / paginationParams.limitPerPage));
                } catch (error) {
                    console.log(error);
                }
            })();
    }, [userData.userId, paginationParams.currentPage]);

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

    const pageHandler = (page) => {
        setPaginationParams((prev) => ({
            ...prev,
            currentPage: page,
        }));
    };

    return (
        <>
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
            <Pagination totalPages={totalPages} currentPage={paginationParams.currentPage} onPageChange={pageHandler} />
        </>
    );
};
