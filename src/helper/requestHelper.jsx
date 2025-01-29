import axios from 'axios';
import { Base64 } from 'js-base64';

export const requestHelper = async (config) => {
    try {
        return await axios({
            method: config.method || 'GET',
            url: `http://localhost:8080${config.url}`,
            data: config.data ? config.data : null,
            headers: { Authorization: `Bearer ${Base64.encode(localStorage.getItem('token'))}` },
        });
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};
