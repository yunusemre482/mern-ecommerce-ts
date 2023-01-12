import React, { useEffect } from 'react';
import { IProduct } from 'types/product.types';
import useStore from 'store';
import ProductItem from 'components/product/ProductItem';
import ProductSearchCriteriaBox from 'components/product/ProductSearchCriteriaBox';

import styles from './Products.module.scss';
const Products = () => {
	const products: IProduct[] = useStore((state) => state.products);
	const getProducts = useStore((state) => state.getProducts);

	useEffect(() => {
		getProducts();
	}, [getProducts]);

	return (
		<div className={styles.product__list__wrapper}>
			<ProductSearchCriteriaBox />
			<div className={styles.product__list__container}>
				{products.map((product) => (
					<ProductItem key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Products;
