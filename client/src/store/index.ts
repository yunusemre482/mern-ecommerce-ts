import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductState, productSlice } from './productSlice';
import { UserState, userSlice } from './userSlice';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface Store extends ProductState, UserState {}

const useStore = create<Store>()(
	persist(
		(...a) => ({
			...userSlice(...a),
			...productSlice(...a),
		}),
		{
			name: 'store',
			getStorage: () => localStorage,
		}
	)
);

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('store', useStore);
}
export default useStore;
