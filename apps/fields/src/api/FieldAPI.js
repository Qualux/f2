import axios from 'axios';

export const FieldAPI = {

    baseUrl: 'http://ds.local/wp-json/zero/v1',

    get: async function (page, sortColumn = 'ID', sortOrder = 'DESC', recordsPerPage = 10, fieldTypeFilter, searchFilter) {
        const response = await axios.get(`${this.baseUrl}/field`, {
            params: {
                page: page,
                order: sortOrder,
                orderby: sortColumn,
                records_per_page: recordsPerPage,
                field_type: fieldTypeFilter,
                search: searchFilter,
            },
        });
        return response.data;
    },

};
