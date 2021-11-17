import axios from 'axios';
import { apiUrl } from '~/env';

export default axios.create({
	baseURL: `${apiUrl}/api/v1`,
	timeout: 30000,
	withCredentials: true,
	transitional: {
		clarifyTimeoutError: true,
	},
});
