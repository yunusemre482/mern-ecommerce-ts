import axios from 'axios';
import useStore from 'store';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api/v1',
});

axiosInstance.interceptors.request.use(
	function (config) {
		// set token to request header
		const token = localStorage.getItem('authToken');
		if (token) {
			config.headers
				? (config.headers.Authorization = `Bearer ${token}`)
				: (config.headers = { Authorization: `Bearer ${token}` });
		}

		console.log('Request sent', config);

		return config;
	},
	function (error) {
		const logout = useStore.getState().logout;
		const { status } = error.response;
		if (status === 401) {
			logout();
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
