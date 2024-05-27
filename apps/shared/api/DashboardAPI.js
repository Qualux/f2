import axios from 'axios';

export const DashboardAPI = {

    get: async function (id) {
        const response = await axios.get(`${window.f3Settings.apiF3Root}dashboard/data`, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                'X-WP-Nonce': window.f3Settings.nonce,
            }
        });
        return response.data;
    },

};
