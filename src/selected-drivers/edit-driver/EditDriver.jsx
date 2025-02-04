import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestHelper } from '../../helper/requestHelper';
import './EditDriver.scss';

export const EditDriver = () => {
    const { driverId } = useParams();

    const [currentDriver, setCurrentDriver] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const drivers = await requestHelper({
                    url: `/driver/${driverId}`,
                });

                setCurrentDriver(drivers.data.driver);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleImageChange = (e) => {
        setCurrentDriver((prev) => ({
            ...prev,
            imageUrl: URL.createObjectURL(e.target.files[0]).toString(),
        }));
    };

    const handleUserUpdating = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            await requestHelper({
                method: 'PUT',
                url: `/driver/${currentDriver._id}`,
                data: { image: formData.get('image') },
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deletePicture = () => {
        setCurrentDriver();
    };

    return (
        <div>
            <div>{currentDriver?.code}</div>
            <div>{currentDriver?.dateOfBirth}</div>
            <div>{currentDriver?.driverId}</div>
            <div>{currentDriver?.familyName}</div>
            <div>{currentDriver?.givenName}</div>
            <div>{currentDriver?.nationality}</div>
            <div>{currentDriver?.permanentNumber}</div>
            <div>{currentDriver?.url}</div>
            <div>{currentDriver?.userId}</div>
            {currentDriver.imageUrl && (
                <div className="driver-photo-wrapper">
                    <img
                        //TODO It's temporary solution!!!
                        src={
                            currentDriver.imageUrl.includes('3000')
                                ? currentDriver.imageUrl
                                : `http://localhost:8080/${currentDriver.imageUrl}`
                        }
                        alt="driver-photo"
                        className="driver-photo"
                    />
                    <div className="driver-photo-delete" onClick={deletePicture}>
                        +
                    </div>
                </div>
            )}
            <form className="user-form" onSubmit={handleUserUpdating}>
                <div className="form-new-password">
                    <label>Edit photo:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit" className="form-submit">
                    Edit user
                </button>
            </form>
        </div>
    );
};
