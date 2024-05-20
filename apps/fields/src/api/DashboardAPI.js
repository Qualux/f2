import axios from 'axios';

export const DashboardAPI = {

    baseUrl: 'http://ds.local/wp-json/f3/v1',

    get: async function (id) {
        const response = await axios.get(`${this.baseUrl}/dashboard/data`);
        return response.data;
    },

};
