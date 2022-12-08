import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type ConfigParams = {
	method: string;
	url: string;
	data?: any;
	params?: any;
};

const client = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

const useAxios = (configParams: ConfigParams) => {
	const [res, setRes] = useState<string>('');
	const [err, setErr] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchDataUsingAxios();
	}, []);

	const fetchDataUsingAxios = async () => {
		await axios
			.request(configParams)
			.then((res: AxiosResponse) => setRes(res.data))
			.catch((err) => setErr(err))
			.finally(() => setLoading(false));
	};
	return [res, err, loading];
};

export const setAuthToken = (token: string) => {
	if (token) {
		client.defaults.headers.common['Authorization'] = token;
	} else {
		delete client.defaults.headers.common['Authorization'];
	}
};

export default useAxios;
