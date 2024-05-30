import axios from 'axios';

class WordPressAPI {

    async getPostTypes() {
        try {
            const response = await axios.get(`${window.f3Settings.apiRoot}wp/v2/types?context=edit`, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'X-WP-Nonce': window.f3Settings.nonce,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch post types.');
        }
    }

    async getPosts(postType, params = {}) {
        try {
            const response = await axios.get(`${window.f3Settings.apiRoot}wp/v2/${postType}`, {
                params,
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'X-WP-Nonce': window.f3Settings.nonce,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch posts.');
        }
    }

    async getPost(postType, id) {
        try {
            const response = await axios.get(`${window.f3Settings.apiRoot}wp/v2/${postType}/${id}`, {
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    'X-WP-Nonce': window.f3Settings.nonce,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch post.');
        }
    }

}

export default WordPressAPI;
