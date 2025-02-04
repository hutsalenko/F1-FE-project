import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { requestHelper } from '../../helper/requestHelper';
import './EditDriver.scss';

export const EditDriver = () => {
    const { state } = useLocation();

    const [currentImage, setCurrentImage] = useState({
        image: state.imageUrl,
    });

    const handleImageChange = (e) => {
        setCurrentImage({ image: URL.createObjectURL(e.target.files[0]).toString() });
    };

    const handleUserUpdating = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            await requestHelper({
                method: 'PUT',
                url: `/drivers/${state._id}`,
                data: { image: formData.get('image') },
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deletePicture = () => {
        setCurrentImage();
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
            {currentImage.image && (
                <div className="driver-photo-wrapper">
                    <img
                        //TODO It's temporary solution!!!
                        src={
                            currentImage.image.includes('3000')
                                ? currentImage.image
                                : `http://localhost:8080/${currentImage.image}`
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
