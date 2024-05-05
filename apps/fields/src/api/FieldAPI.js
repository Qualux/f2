// FieldApi, introduced 2024-05-05

// See guide at https://semaphoreci.com/blog/api-layer-react. 

import { api } from './config/axiosConfig';

export const FieldAPI = {

    get: async function (id, cancel = false) {
      const response = await api.request({
        // url: `/field/:id`,
        url: '/field?limit=4',
        method: "GET",
      })
  
      return response;

    }

}