// FieldApi, introduced 2024-05-05

// See guide at https://semaphoreci.com/blog/api-layer-react. 

import { api } from './config/axiosConfig';

export const FieldAPI = {

    get: async function ( page, sortColumn = 'ID', sortOrder = 'DESC', recordsPerPage = 10 ) {

      const response = await api.request({
        url: `/field?page=${page}&order=${sortOrder}&orderby=${sortColumn}&records_per_page=${recordsPerPage}`,
        method: "GET",
      })
  
      return response.data;

    }

}