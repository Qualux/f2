import axios from 'axios';

export const SDO_StandardAPI = {

    baseUrl: 'http://ds.local/wp-json/f3/v1',
    route_base: '',

    get: async function (page = 1, sortColumn = 'ID', sortOrder = 'DESC', filterValues = {}) {

        console.log('api call SDO_StandardAPI:');
        console.log(this.route_base);

        const params = {
            page: page,
            order: sortOrder,
            orderby: sortColumn,
        };

        if (filterValues.records_per_page) {
            params.records_per_page = filterValues.records_per_page;
        }

        if (filterValues.search) {
            params.search = filterValues.search;
        }

        const response = await axios.get(`${this.baseUrl}/${this.route_base}`, {
            params,
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                'X-WP-Nonce': window.wpApiSettings.nonce,
            }
        });
        return response.data;
    },

    getOne: async function (id) {
        const response = await axios.get(`${this.baseUrl}/${this.route_base}/${id}`, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                'X-WP-Nonce': window.wpApiSettings.nonce,
            }
        });
        return response.data;
    },

    create: async function (data) {
        try {
            const response = await axios.post(`${this.baseUrl}/${this.route_base}`, data, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'X-WP-Nonce': window.wpApiSettings.nonce,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to create item.');
        }
    },

    edit: async function (id, data) {
        try {
            const response = await axios.put(`${this.baseUrl}/${this.route_base}/${id}`, data, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'X-WP-Nonce': window.wpApiSettings.nonce,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to edit item.');
        }
    },

    delete: async function (id) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${this.route_base}/${id}`, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'X-WP-Nonce': window.wpApiSettings.nonce,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete item.');
        }
    },

};
