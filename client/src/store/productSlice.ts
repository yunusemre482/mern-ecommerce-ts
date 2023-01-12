import { StateCreator } from 'zustand';
import { IProduct } from '../types/product.types';
import { UserState } from './userSlice';
import axios from 'config/axiosConfig';

type State = {
	products: IProduct[] | [];
	cart: IProduct[] | [];
	isProductsLoading: boolean;
	isCartLoading: boolean;
	error: string | null;
};
type Actions = {
	getProducts: () => void;
	likeProduct: (id: string) => void;
	addToCart: (product: IProduct) => void;
	removeFromCart: (product: IProduct) => void;
	clearCart: () => void;
};

export type ProductState = State & Actions;

export const productSlice: StateCreator<ProductState & UserState, [], [], ProductState> = (
	set
) => ({
	products: [],
	cart: [],
	isProductsLoading: false,
	isCartLoading: false,
	error: null,
	getProducts: async () => {
		set((state) => ({ ...state, isProductsLoading: true }));

		const { data, success, error } = await axios
			.get('/products/all')
			.then((res) => res.data)
			.catch((err) => set((state) => ({ ...state, error: err })));
		if (error) {
			set((state) => ({ ...state, error: error, isProductsLoading: false }));
		}

		if (success) {
			console.log(data.products);
			set((state) => ({ ...state, products: data.products, isProductsLoading: false }));
		}
	},
	likeProduct: async (id: string) => {
		const { data, success, error } = await axios
			.post('/products/like', { id })
			.then((res) => res.data)
			.catch((err) => set((state) => ({ ...state, error: err })));
		if (error) {
			set((state) => ({ ...state, error: error, isProductsLoading: false }));
		}
		if (success) {
			console.log(data);
			set((state) => ({ ...state, isProductsLoading: false }));
		}
	},
	disLikeProduct: async (id: string) => {
		const { data, success, error } = await axios
			.post('/products/dislike', { id })
			.then((res) => res.data)
			.catch((err) => set((state) => ({ ...state, error: err })));
		if (error) {
			set((state) => ({ ...state, error: error, isProductsLoading: false }));
		}
		if (success) {
			console.log(data);
			set((state) => ({ ...state, isProductsLoading: false }));
		}
	},
	addToCart: (product: IProduct) => {},
	removeFromCart: (product: IProduct) => {},
	clearCart: () => {},
});
