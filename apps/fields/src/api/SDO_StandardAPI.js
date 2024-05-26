import axios from 'axios';

export const SDO_StandardAPI = {

    route_base: '',

    get: async function (page = 1, sortColumn = 'ID', sortOrder = 'DESC', filterValues = {}) {

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

        const response = await axios.get(`${window.wpApiSettings.root}/${this.route_base}`, {
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
        const response = await axios.get(`${window.wpApiSettings.root}/${this.route_base}/${id}`, {
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
            const response = await axios.post(`${window.wpApiSettings.root}/${this.route_base}`, data, {
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
            const response = await axios.put(`${window.wpApiSettings.root}/${this.route_base}/${id}`, data, {
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
            const response = await axios.delete(`${window.wpApiSettings.root}/${this.route_base}/${id}`, {
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
