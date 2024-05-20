import axios from 'axios';

export const GridAPI = {
    
    baseUrl: 'http://ds.local/wp-json/f3/v1',

    get: async function (page, sortColumn = 'ID', sortOrder = 'DESC', filterValues) {
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

        const response = await axios.get(`${this.baseUrl}/sdo/grid`, { params });
        return response.data;
    },

    getOne: async function (id) {
        const response = await axios.get(`${this.baseUrl}/sdo/grid/${id}`);
        return response.data;
    },

    delete: async function (id) {
        try {
            const response = await axios.delete(`${this.baseUrl}/sdo/grid/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete item.');
        }
    },

    create: async function (data) {
        try {
            const response = await axios.post(`${this.baseUrl}/sdo/grid`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create item.');
        }
    },

    edit: async function (id, data) {
        try {
            const response = await axios.put(`${this.baseUrl}/sdo/grid/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to edit item.');
        }
    },

};
