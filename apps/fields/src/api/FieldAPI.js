import axios from 'axios';

export const FieldAPI = {

    baseUrl: 'http://ds.local/wp-json/f3/v1',

    get: async function (page, sortColumn = 'ID', sortOrder = 'DESC', filterValues) {

        // recordsPerPage = 10, fieldTypeFilter, searchFilter
        const params = {
            page: page,
            order: sortOrder,
            orderby: sortColumn,
        }

        if(filterValues.records_per_page) {
            params.records_per_page = filterValues.records_per_page;
        }

        if(filterValues.field_type) {
            params.field_type = filterValues.field_type;
        }

        if(filterValues.search) {
            params.search = filterValues.search;
        }

        const response = await axios.get(`${this.baseUrl}/field`, { params });

        return response.data;

    },

};
