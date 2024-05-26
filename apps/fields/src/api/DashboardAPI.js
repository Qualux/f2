import axios from 'axios';

export const DashboardAPI = {

    get: async function (id) {
        const response = await axios.get(`${window.wpApiSettings.root}/dashboard/data`, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                'X-WP-Nonce': window.wpApiSettings.nonce,
            }
        });
        return response.data;
    },

};
