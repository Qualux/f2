import axios from 'axios';

export const FieldGroupAPI = {

    baseUrl: 'http://ds.local/wp-json/zero/v1',

    get: async function (page, sortColumn = 'ID', sortOrder = 'DESC', filterValues) {

        const params = {
            page: page,
            order: sortOrder,
            orderby: sortColumn,
        }

        /*
        if(filterValues.records_per_page) {
            params.records_per_page = filterValues.records_per_page;
        }
        */

        const response = await axios.get(`${this.baseUrl}/field-group`, { params });

        return response.data;

    },

};
