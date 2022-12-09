import { StateCreator } from 'zustand';
import { IProduct } from '../types/product.types';
import { UserState } from './userSlice';

type State = {
	products: IProduct[];
	cart: IProduct[];
	isProductsLoading: boolean;
	isCartLoading: boolean;
	error: string | null;
};
type Actions = {
	getProducts: () => void;
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
	getProducts: () => {},
	addToCart: (product: IProduct) => {},
	removeFromCart: (product: IProduct) => {},
	clearCart: () => {},
});
