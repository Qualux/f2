import axios from 'axios';

class StandardAPI {

    constructor(route_base) {
        this.route_base = route_base;
    }

    async get(page = 1, sortColumn = 'ID', sortOrder = 'DESC', filterValues = {}) {

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
    }

    async getOne(id) {
        const response = await axios.get(`${window.wpApiSettings.root}/${this.route_base}/${id}`, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                'X-WP-Nonce': window.wpApiSettings.nonce,
            }
        });
        return response.data;
    }

    async create(data) {
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
    }

    async edit(id, data) {
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
    }

    async delete(id) {
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
    }
}

export default StandardAPI;
