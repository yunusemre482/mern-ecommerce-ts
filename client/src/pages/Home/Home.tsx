import React from 'react';
import useStore from 'store';
import { useEffect } from 'react';
import { IProduct } from 'types/product.types';
const Home = () => {
	const { products, getProducts } = useStore((state) => ({
		products: state.products,
		getProducts: state.getProducts,
	}));

	useEffect(() => {
		getProducts();
	}, [getProducts]);

	return <div></div>;
};

export default Home;
