// FieldApi, introduced 2024-05-05

// See guide at https://semaphoreci.com/blog/api-layer-react. 

import { api } from './config/axiosConfig';

export const FieldAPI = {

    get: async function ( page ) {

      const response = await api.request({
        url: `/field?limit=3&page=${page}`,
        method: "GET",
      })
  
      return response.data;

    }

}