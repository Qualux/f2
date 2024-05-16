import axios from 'axios';

export const TaxonomyAPI = {

    baseUrl: 'http://ds.local/wp-json/f3/v1',

    get: async function (page, sortColumn = 'ID', sortOrder = 'DESC', filterValues) {

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

        const response = await axios.get(`${this.baseUrl}/sdo/taxonomy`, { params });

        return response.data;

    },

    delete: async function (id) {
        try {
            const response = await axios.delete(`${this.baseUrl}/sdo/taxonomy/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete item.');
        }
    },

};
