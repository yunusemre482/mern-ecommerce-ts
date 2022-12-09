import axios from 'axios';
const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:5000/api/v1';
axiosClient.defaults.headers.post['Content-Type'] = 'application/json';
axiosClient.defaults.withCredentials = true;

export async function getRequest(URL: string) {
	return await axiosClient.get(`${URL}`).then((response) => response);
}

export async function postRequest(URL: string, payload: any) {
	return await axiosClient.post(`${URL}`, payload).then((response) => response);
}

export async function patchRequest(URL: string, payload: any) {
	return await axiosClient.patch(`${URL}`, payload).then((response) => response);
}

export async function deleteRequest(URL: string) {
	return await axiosClient.delete(`${URL}`).then((response) => response);
}

export const setAuthToken = (token: string) => {
	if (token) {
		axiosClient.defaults.headers.common['Authorization'] = token;
	} else {
		delete axiosClient.defaults.headers.common['Authorization'];
	}
};
