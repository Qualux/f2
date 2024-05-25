import axios from 'axios';

export const SDO_StandardAPI = {

    baseUrl: 'http://ds.local/wp-json/f3/v1',
    routeBase: '',

    get: async function ( page = 1, sortColumn = 'ID', sortOrder = 'DESC', filterValues = {} ) {

        const params = {
            page: page,
            order: sortOrder,
            orderby: sortColumn,
        }

        if(filterValues.records_per_page) {
            params.records_per_page = filterValues.records_per_page;
        }


        if(filterValues.search) {
            params.search = filterValues.search;
        }

        const response = await axios.get(`${this.baseUrl}/${this.routeBase}`, { params });
        return response.data;

    },

    getOne: async function (id) {
        const response = await axios.get(`${this.baseUrl}/${this.routeBase}/${id}`);
        return response.data;
    },

    create: async function (data) {
        try {
            const response = await axios.post(`${this.baseUrl}/${this.routeBase}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create item.');
        }
    },

    edit: async function (id, data) {
        try {
            const response = await axios.put(`${this.baseUrl}/${this.routeBase}/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to edit item.');
        }
    },


    delete: async function (id) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${this.routeBase}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete item.');
        }
    },

};
