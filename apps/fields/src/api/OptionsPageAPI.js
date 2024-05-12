import axios from 'axios';

export const OptionsPageAPI = {

    baseUrl: 'http://ds.local/wp-json/f2/v1',

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

        const response = await axios.get(`${this.baseUrl}/sdo/options-page`, { params });

        return response.data;

    },

};
