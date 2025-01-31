import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { requestHelper } from '../../helper/requestHelper';
import './EditDriver.scss';

export const EditDriver = () => {
    const { state } = useLocation();

    const [formData, setFormData] = useState({
        image: {},
    });

    const handleImageChange = (e) => {
        const { name, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleUserUpdating = async (e) => {
        e.preventDefault();
        try {
            await requestHelper({
                method: 'PUT',
                url: `/drivers/${state._id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>{state.code}</div>
            <div>{state.dateOfBirth}</div>
            <div>{state.driverId}</div>
            <div>{state.familyName}</div>
            <div>{state.givenName}</div>
            <div>{state.nationality}</div>
            <div>{state.permanentNumber}</div>
            <div>{state.url}</div>
            <div>{state.userId}</div>
            {state.imageUrl && (
                <img src={`http://localhost:8080/${state.imageUrl}`} alt="driver-photo" className="driver-photo" />
            )}
            <form className="user-form" encType="multipart/form-data">
                <div className="form-new-password">
                    <label>Edit photo:</label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </div>
                <button type="submit" className="form-submit" onClick={handleUserUpdating}>
                    Edit user
                </button>
            </form>
        </div>
    );
};
