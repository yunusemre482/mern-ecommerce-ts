import { IUser, IRegisterUser, ILoginUser } from './../types/user.types';
import { ProductState } from './productSlice';
import { immer } from 'zustand/middleware/immer';
import { StateCreator } from 'zustand';
import axios from 'config/axiosConfig';

type State = {
	user: IUser | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
};

type Actions = {
	login: (payload: ILoginUser) => void;
	logout: () => void;
	register: (payload: IRegisterUser) => void;
};

export type UserState = State & Actions;

export const userSlice: StateCreator<UserState & ProductState, [], [], UserState> = (set) => ({
	user: null,
	isAuthenticated: false,
	loading: false,
	error: null,
	login: async (payload: ILoginUser) => {
		set((state) => ({ ...state, loading: true }));

		const { data, error, success } = await axios
			.post('/auth/login', payload)
			.then((res) => res.data)
			.catch((err) => set((state) => ({ ...state, error: err })));
		if (error) {
			set((state) => ({ ...state, error: error, loading: false }));
		}

		if (success) {
			const token = data.token;
			localStorage.setItem('authToken', token);
			set((state) => ({ ...state, user: data.user, isAuthenticated: true, loading: false }));
		}
	},
	logout: () => {
		localStorage.removeItem('authToken');
		set((state) => ({ ...state, user: null, isAuthenticated: false }));
	},
	register: async (payload: IRegisterUser) => {
		set((state) => ({ ...state, loading: true }));

		const { error, success } = await axios
			.post('/auth/register', payload)
			.then((res) => res.data)
			.catch((err) => set((state) => ({ ...state, error: err })));

		if (error) {
			set((state) => ({ ...state, error: error, loading: false }));
		}
		if (success) {
			window.location.href = '/login';
		}
	},
});
