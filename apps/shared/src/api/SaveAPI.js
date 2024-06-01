import axios from 'axios';

class SaveAPI {

    async save( location, record, form, values ) {
        try {
            const response = await axios.post(`${window.f3Settings.apiF3Root}save`, { location, record, form, values }, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'X-WP-Nonce': window.f3Settings.nonce,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to create item.');
        }
    }

}

export default SaveAPI;
