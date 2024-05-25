import axios from 'axios';

class StandardAPI {
    constructor(routeBase) {
        this.baseUrl = 'http://ds.local/wp-json/f3/v1';
        this.routeBase = routeBase;
    }

    async get(page = 1, sortColumn = 'ID', sortOrder = 'DESC', filterValues = {}) {
        console.log('api call StandardAPI:', this.routeBase);

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

        const response = await axios.get(`${this.baseUrl}/${this.routeBase}`, { params });
        return response.data;
    }

    async getOne(id) {
        const response = await axios.get(`${this.baseUrl}/${this.routeBase}/${id}`);
        return response.data;
    }

    async create(data) {
        try {
            const response = await axios.post(`${this.baseUrl}/${this.routeBase}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to create item.');
        }
    }

    async edit(id, data) {
        try {
            const response = await axios.put(`${this.baseUrl}/${this.routeBase}/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to edit item.');
        }
    }

    async delete(id) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${this.routeBase}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete item.');
        }
    }
}

export default StandardAPI;
