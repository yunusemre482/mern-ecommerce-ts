import { IUser } from './../types/user.types';
import { ProductState } from './productSlice';
import { immer } from 'zustand/middleware/immer';
import { StateCreator } from 'zustand';
import { postRequest, getRequest, setAuthToken } from '../config/axiosConfig';

type State = {
	user: IUser | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
};

type Actions = {
	login: ({ username, password }: { username: string; password: string }) => void;
	logout: () => void;
	register: () => void;
};

export type UserState = State & Actions;

export const userSlice: StateCreator<UserState & ProductState, [], [], UserState> = (set) => ({
	user: null,
	isAuthenticated: false,
	loading: false,
	error: null,
	login: async ({ username, password }: { username: string; password: string }) => {
		set((state) => ({ ...state, loading: true }));

		const { data, error, success } = await postRequest('/auth/login', {
			username,
			password,
		})
			.then((res) => res.data)
			.catch((err) => set((state) => ({ ...state, error: err })));
		if (error) {
			set((state) => ({ ...state, error: error, loading: false }));
		}

		if (success) {
			const token = data.token;
			localStorage.setItem('authToken', token);
			setAuthToken(token);
			set((state) => ({ ...state, user: data.user, isAuthenticated: true, loading: false }));
		}
	},
	logout: () => {},
	register: () => {},
});
